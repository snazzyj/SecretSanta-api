const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');
const {makeUsersArray, makePoolsArray, getPairings} = require('./user.fixtures');

describe.only('Pairings Endpoint', function() {
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

    describe(`POST /api/pairings`, () => {
        context('Given there are users and pools in the database', () => {
            const testUsers = makeUsersArray();
            const testPools = makePoolsArray();
            const testPairs = getPairings();

            beforeEach('insert users and pools', () => {
                return db
                .into('users')
                .insert(testUsers)
                .then( () => {
                    return db.into('pool_table').insert(testPools)
                })
            })

            it(`POST /api/pairings responds with 201`, () => {
                return supertest(app)
                    .post('/api/pairings')
                    .send(testPairs)
                    .expect(201)
            })
        })
    })

    describe(`GET /api/pairings/:pool_id`, () => {
        context('Given there are users, pools and pairings', () => {
            const testUsers = makeUsersArray();
            const testPools = makePoolsArray();
            const testPairs = getPairings();

            beforeEach('insert users', () => {
                return db
                .into('users')
                .insert(testUsers)
                .then( () => {
                    return db.into('pool_table').insert(testPools)
                })
                .then( () => {
                    return db.into('members_pool').insert(testPairs)
                })
            })

            it('GET /api/pairings/:pool_id responds with 200 and the all pairs', () => {
                const poolId = 1;
                const expectedPairs = getPairings();

                return supertest(app)
                    .get(`/api/pairings/${poolId}`)
                    .expect(200, expectedPairs)
            })

        })
    })










})