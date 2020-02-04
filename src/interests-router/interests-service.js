const InterestsService = {

    insertInterest(knex, newInterest) {
        return knex
        .insert(newInterest)
        .into('user_interests')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    getInterestByEmail(knex, email) {
        return knex
        .select('interest')
        .from('user_interests')
        .where('email', email)
    },

    getInterestById(knex, id) {
        return knex
            .select('interest')
            .from('users')
            .where('id', id)
            .join('user_interests', 'users.email', '=', 'user_interests.email')
    },

    deleteInterest(knex, interest, email) {
        return knex
        .from('user_interests')
        .where({
            interest : interest,
            email : email
        })
        .delete()
    }

}

module.exports = InterestsService;