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
        .select('interest')
        .from('user_interests')
        .where('email', email)
    },

    deleteInterest(knex, interest, email) {
        console.log(interest)
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