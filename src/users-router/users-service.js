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

    // getUserPair(knex, email) {
    //     return knex.select('members_pool.giftee', 'users.name')
    //         .from('users')
    //         .join('members_pool', email, '=', 'members_pool.giftee')
    // }
}

module.exports = UsersService;
