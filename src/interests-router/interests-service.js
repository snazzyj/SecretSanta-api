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

    getInterest(knex, email) {
        return knex
        .select('*')
        .from('user_interests')
        .where('email', email)
    },

    deleteInterest(knex, interest) {
        return knex
        .from('user_interests')
        .where('interest', interest)
        .delete()
    }

}

module.exports = InterestsService;