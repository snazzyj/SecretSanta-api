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
            password: 'IamACat2'
        },
        {
            id: 3,
            name: 'Leyna',
            email: 'catsarethebest@gmail.com',
            password: 'CatLover123'
        },
        {
            id: 4,
            name: 'Ollie',
            email: 'imajerk@gmail.com',
            password: 'jerK123'
        }
    ]
}

function makePoolsArray() {
    return [
        {
            pool_id: 1,
            admin_email: 'silentx.alex@gmail.com',
            pool_name: 'Secret Santa Test'
        },
        {
            pool_id: 2,
            admin_email: 'imacat@gmail.com',
            pool_name: 'Cat Santa'
        }
    ]
}

function getPairings() {
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

function makeInterestsArray() {
    return [
        {
            email: 'silentx.alex@gmail.com',
            interest: 'Plushies'
        },
        {
            email: 'catsarethebest@gmail.com',
            interest: 'Candles'
        },
        {
            email: 'imajerk@gmail.com',
            interest: 'Catnip'
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
    getPairings, 
    makeInterestsArray
}