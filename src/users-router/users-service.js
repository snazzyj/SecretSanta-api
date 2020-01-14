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

    insertUsers(knex, user) {
        // return knex
        // .insert(users)
        // .into('users')
        // .returning('*')
        // .then(rows => {
        //     console.log({rows})
        //     return rows[0]
        // })

        return knex
        .from('users')
        .where('email', user.email)
        .then(rows => {
            console.log({rows})
            if (rows.length === 0) {
                return knex
                    .insert(user)
                    .into('users')
                    .returning('*')
            }
        })
    }
}

module.exports = UsersService;
