const VerifyService = {
    getConfirmationCodes(knex, pool_id) {
        return knex.select('confirmation_code')
            .from('members_pool')
            .where('pool_id', pool_id)
    },
    updateConfirmation(knex, code, pool_id) {
        console.log('updateConfirmation ran')
        console.log(typeof (code))
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