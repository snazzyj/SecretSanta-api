const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },

    getById(knex, id) {
        return knex
            .select('*')
            .from('users')
            .where('id', id)
    },
    getByEmail(knex, email) {
        return knex
            .select('*')
            .from('users')
            .where('email', email)
    },

    insertUsers(knex, users) {
        return knex
        .insert(users)
        .into('users')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    }
}

module.exports = UsersService;
