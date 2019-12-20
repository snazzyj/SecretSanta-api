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
        }
    ]
}

function makePoolsArray() {
    return [
        {
            id: 1,
            admin_email: 'silentx.alex@gmail.com',
            pool_name: 'Secret Santa Test'
        },
        {
            id: 2,
            admin_email: 'imacat@gmail.com',
            pool_name: 'Cat Santa'
        }
    ]
} 

module.exports = {makeUsersArray, makePoolsArray}