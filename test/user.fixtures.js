function makeUsersArray() {
    return [
        {   
            id: 1,
            name: 'Alex',
            email: 'silentx.alex@gmail.com',
            password: '$2a$04$2rz5yysGLie6erX24FoIjeyT6VSPnEmZ51pYtXrFAXyPU7fTxVgL2'
        },
        {
            id: 2,
            name: 'Charleigh',
            email: 'imacat@gmail.com',
            password: null
        },
        {
            id: 3,
            name: 'Leyna',
            email: 'catsarethebest@gmail.com',
            password: null
        },
        {
            id: 4,
            name: 'Ollie',
            email: 'imajerk@gmail.com',
            password: null
        }
    ]
}

function makePoolsArray() {
    return [
        {
            pool_id: 1,
            admin_email: 'silentx.alex@gmail.com',
            pool_name: 'Secret Santa Test'
        }
    ]
}

function makePairingsArray() {
    return [
        {
            pool_id: 1,
            email: 'silentx.alex@gmail.com',
            giftee: 'imacat@gmail.com',
            confirmation: false,
        },
        {
            pool_id: 1,
            email: 'imacat@gmail.com',
            giftee: 'catsarethebest@gmail.com',
            confirmation: false,
        },
        {
            pool_id: 1,
            email: 'catsarethebest@gmail.com',
            giftee: 'imajerk@gmail.com',
            confirmation: false,
        },
        {
            pool_id: 1,
            email: 'imajerk@gmail.com',
            giftee: 'silentx.alex@gmail.com',
            confirmation: false,
        }
        
    ]
}

function expectedPairsArray() {
    return [
        {
            gifter: 'Alex',
            giftee: 'Charleigh',
            giftee_id: 2,
            id: 1,
            confirmation: false,
        },
        {
            gifter: 'Charleigh',
            giftee: 'Leyna',
            giftee_id: 3,
            id: 2,
            confirmation: false,
        },
        {
            gifter: 'Leyna',
            giftee: 'Ollie',
            giftee_id: 4,
            id: 3,
            confirmation: false,
        },
        {
            gifter: 'Ollie',
            giftee: 'Alex',
            giftee_id: 1,
            id: 4,
            confirmation: false,
        }
    ]
}

function makeInterestsArray() {
    return [
        {
            email: 'silentx.alex@gmail.com',
            interest: 'Plushies'
        },
        {
            email: 'silentx.alex@gmail.com',
            interest: 'Peppermint'
        },

    ]
}

module.exports = {
    makeUsersArray, 
    makePoolsArray, 
    makePairingsArray,
    expectedPairsArray, 
    makeInterestsArray
}