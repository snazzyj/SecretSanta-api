const PairingsService = {
    getAllPairs(knex, pool_id) {
        return knex.select('*').from('members_pool').where('pool_id', pool_id)
    }
    ,
    insertPairs(knex, newPairs) {
        return knex
        .insert(newPairs)
        .into('members_pool')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    }
}

module.exports = PairingsService;