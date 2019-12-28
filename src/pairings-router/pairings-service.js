const shuffle = (array) => {
    let poolOfNames = [];
    while (array.length !== poolOfNames.length) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * array.length);
        poolOfNames.push(array[randomIndex]);
        // array.splice(randomIndex, 1);
    }
    return poolOfNames;
}

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
    },

    generatePairings(userList) {
        const poolOfNames = shuffle(userList);

        let left = poolOfNames.slice(0, poolOfNames.length / 2)
        let right = poolOfNames.slice(Math.ceil(poolOfNames.length / 2))

        left.forEach((leftUser, i) => {
            let rightUser = right[i]
            
            leftUser.giftee = rightUser.email;
            rightUser.giftee = leftUser.email;
        })

        return poolOfNames;
    }


}

module.exports = PairingsService;