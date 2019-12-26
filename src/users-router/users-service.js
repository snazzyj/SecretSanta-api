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
    }
}

module.exports = UsersService;
