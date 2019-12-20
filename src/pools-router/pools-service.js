const poolsService = {
    insertPool(knex, newPool) {
        return knex
        .into('pool_table')
        .insert(newPool)
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    }
}

module.exports = poolsService;