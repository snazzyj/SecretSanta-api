const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');
const {makeUsersArray, makePoolsArray} = require('./user.fixtures');

describe('Pools Endpoints', function () {
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

    describe(`POST /api/pools`, () => {
        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();
            const testPools = makePoolsArray();
            const testPool = testPools[0]

            beforeEach('insert pools and users', () => {
                return db.into('users')
                    .insert(testUsers)
            })

            it(`responds with 201 when creating new Pool`, () => {
                const newPool = {
                    admin_email: 'silentx.alex@gmail.com',
                    pool_name: 'Cat Santa',
                    id: 1
                }

                return supertest(app)
                    .post('/api/pools/')
                    .send(newPool)
                    .expect(201)
            })

        })
    })




})