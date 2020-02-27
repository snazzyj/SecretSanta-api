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
            admin_email: 'silentx.alex@gmail.com',
            pool_name: 'Secret Santa Test'
        }
    ]
}

function makePairingsArray() {
    return [
        {
            email: 'silentx.alex@gmail.com',
            giftee: 'imacat@gmail.com',
        },
        {
            email: 'imacat@gmail.com',
            giftee: 'catsarethebest@gmail.com',
        },
        {
            email: 'catsarethebest@gmail.com',
            giftee: 'imajerk@gmail.com',
        },
        {
            email: 'imajerk@gmail.com',
            giftee: 'silentx.alex@gmail.com',
        }
        
    ]
}


function userArray() {
    return [
        {
            name: 'Alex',
            email: 'silentx.alex@gmail.com',
        },
        {
            name: 'Charleigh',
            email: 'imacat@gmail.com',
        },
        {
            name: 'Leyna',
            email: 'catsarethebest@gmail.com',
        },
        {
            name: 'Ollie',
            email: 'imajerk@gmail.com',
        }
    ]
}

function makeInterestsArray() {
    return [
        {
            id: 1,
            interest: 'Plushies'
        },
        {
            id: 1,
            interest: 'Peppermint'
        },

    ]
}

module.exports = {
    makeUsersArray, 
    makePoolsArray, 
    makePairingsArray,
    userArray,
    makeInterestsArray
}