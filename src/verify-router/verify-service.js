const VerifyService = {
    updateConfirmation(knex, code, pool_id) {
        return knex.from('members_pool')
            .where({
                pool_id: pool_id,
                confirmation_code: code
            })
            .update({
                confirmation: true
            })
    }
}

module.exports = VerifyService;