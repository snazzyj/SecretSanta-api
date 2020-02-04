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

    getInterest(knex, id) {
        return knex
        .select('interest')
        .from('user_interests')
        .where('id', id)
    },

    deleteInterest(knex, interest, id) {
        return knex
        .from('user_interests')
        .where({
            interest : interest,
            id : id
        })
        .delete()
    }

}

module.exports = InterestsService;