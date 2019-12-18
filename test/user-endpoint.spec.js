const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');
const {makeUsersArray} = require('./user.fixtures');
const UserService = require('../src/users-router/users-service');

describe.only('Users Endpoints', function() {

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

    describe(`GET /api/users`, () => {
        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();

            beforeEach('insert users', () => {
                return db.into('users')
                .insert(testUsers)
            })

            it('GET /api/users responds with 200 and all of the users', () => {
                return supertest(app)
                    .get('/api/users')
                    .expect(200, testUsers)
            })
        })
    })

    describe(`GET /api/users/:user_id`, () => {
        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();

            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers)
            })

            it('GET /api/users/userId responds with 200 and the specified user', () => {
                const userId = 1;
                const expectedUser = testUsers[userId - 1];

                return supertest(app)
                    .get(`/api/users/${userId}`)
                    .expect(200, expectedUser)
            })

            it('getById() gets a user by id', () => {
                const userId = 1;
                const expectedUser = testUsers[userId - 1];

                return UserService.getById(db, userId)
                    .then(actual => {
                        expect(actual).to.eql(expectedUser)
                    })
            })
        })
    })



})