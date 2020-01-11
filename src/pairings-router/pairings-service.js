const shuffle = (array) => {
    let poolOfUsers = [];
    while (array.length !== 0) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * array.length);
        poolOfUsers.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return poolOfUsers;
}

const PairingsService = {
    getAllPairs(knex, pool_id) {
        return knex.select('giftee.name as giftee', 'gifter.name as gifter', 'gifter.id as id', 'giftee.id as giftee_id')
            .from('members_pool')
            .where('pool_id', pool_id)
            .join('users as giftee', 'members_pool.giftee', '=', 'giftee.email')
            .join('users as gifter', 'members_pool.email', '=', 'gifter.email')
    },
    insertPair(knex, newPairs) {
        return knex
            .insert(newPairs)
            .into('members_pool')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getGifteeName(knex, pair) {
        return knex.select('name')
            .from('users')
            .where('email', pair.giftee)
    },
    generatePairings(userList) {
        const poolOfUsers = shuffle(userList);
        let recipients = poolOfUsers.slice();

        poolOfUsers.forEach((user) => {
            let idx = Math.floor(Math.random() * recipients.length);

            while (recipients[idx] === user) {
                idx = Math.floor(Math.random() * recipients.length)
            }
            user.giftee = recipients[idx].email
            recipients.splice(idx, 1)
        })
        
        return poolOfUsers
    }


}

module.exports = PairingsService;