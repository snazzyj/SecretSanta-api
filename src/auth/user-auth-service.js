const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserAuthService = {
    getUserWithEmail(knex, email) {
        return knex.select('*').from('users').where('email', email).first()
    },

    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },

    createJwt(subject, payload) {
        return jwt.sign(
            payload, 
            config.JWT_SECRET, 
            {
                subject,
                algorithm: 'HS256'
            }
        )
    },
    
    insertUser(knex, newUser) {
        return knex
        .insert(newUser)
        .into('users')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    updateUser(knex, newUser) {
        return knex.from('users')
            .where({
                email: newUser.email
            })
            .update({
                name: newUser.name,
                password: newUser.password,
            })
    },
    
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },

    isAdmin(knex, email) {
        return knex.select('pool_id', 'pool_name').from('pool_table').where('admin_email', email)
    },
    getUserPairs(knex, email) {
        return knex.select('giftee.name as giftee', 'giftee.id as giftee_id')
        .from('members_pool')
        .where('members_pool.email', email)
        .join('users as giftee', 'members_pool.giftee', '=', 'giftee.email')
    }
}

module.exports = UserAuthService;