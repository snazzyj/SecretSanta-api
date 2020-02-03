const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');
const {makeUsersArray, makeInterestsArray} = require('./user.fixtures')

describe.only('Interests Endpoints', function () {

    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());
    before('clean the table', () => db.raw('TRUNCATE users, pool_table, members_pool, user_interests'));
    afterEach('cleanup', () => db.raw('TRUNCATE users, pool_table, members_pool, user_interests'));

    describe(`POST /api/interests`, () => {
        context('Given there are users in the database, POST an interest', () => {
            const testUsers = makeUsersArray();

            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers)
            })

            it(`responds with 201 when adding a new interest`, () => {
                const testInterests = makeInterestsArray();
                const email = 'silentx.alex@gmail.com'

                return supertest(app)
                    .post(`/api/interests/${email}`)
                    .send(testInterests)
                    .expect(201)
            })
        })
    })

    describe(`GET /api/interests/:user_id`, () => {
        context('Given there are users and interests in the database', () => {
            const testUsers = makeUsersArray();
            const testInterests = makeInterestsArray();

            beforeEach('insert users', () => {
                return db
                .into('users')
                .insert(testUsers)
                .then( () => {
                    return db.into('user_interests').insert(testInterests)
                })
            })

            it(`responds with the interest`, () => {
                const userEmail = 'silentx.alex@gmail.com'
                const expected = [
                    {
                        interest: 'Plushies'
                    },
                    {
                        interest: 'Peppermint'
                    }
                ]

                return supertest(app)
                    .get(`/api/interests/${userEmail}`)
                    .expect(200, expected)

            })
        })
    })

})