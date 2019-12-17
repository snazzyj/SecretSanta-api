const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },

    getById(knex, id) {
        return knex
            .from('users')
            .select('*')
            .where('id', id)
            .first()
    }
}

module.exports = UsersService;