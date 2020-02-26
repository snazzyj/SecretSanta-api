const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');
const {makeUsersArray, makeInterestsArray} = require('./user.fixtures')
const TEST_DB_URL = "postgresql://Alex:1@localhost/secret-santa"

describe('Interests Endpoints', function () {

    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: TEST_DB_URL
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
                const testInterest = 'Chocolate';
                const userId = 1;

                return supertest(app)
                    .post(`/api/interests/${userId}`)
                    .send(testInterest)
                    .expect(201)
            })
        })
    })

    describe(`GET /api/interests/:user_id`, () => {
        context('Given there are users and interests in the database', () => {
            const testUsers = makeUsersArray();
            const testInterests = makeInterestsArray(); 
            const testInterest = 'Chocolate';


            beforeEach('insert users', () => {
                return db
                .into('users')
                .insert(testUsers)
                .then( () => {
                    return db.into('user_interests').insert(testInterests)
                })
            })

            it(`responds with the interest`, () => {
                const userId = 1;
                const expected = [
                    {
                        interest: 'Plushies'
                    },
                    {
                        interest: 'Peppermint'
                    }
                ]

                return supertest(app)
                    .get(`/api/interests/${userId}`)
                    .expect(200, expected)

            })
        })
    })

})