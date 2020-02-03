const { expect } = require('chai')
const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { makeUsersArray } = require('./user.fixtures');

describe('User Auth Endpoints', function () {

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


    describe(`POST /api/auth/login`, () => {

        context('Given there are users in the database', () => {
            const testUsers = makeUsersArray();
            const testUser = testUsers[0]

            beforeEach('insert users', () => {
                return db.into('users').insert(testUsers)
            })

            const requiredFields = ['email', 'password'];
            requiredFields.forEach(field => {
                const loginAttemptBody = {
                    email: testUser.email,
                    password: testUser.password
                }

                it(`responds with 400 required error when '${field} is missing`, () => {
                    delete loginAttemptBody[field];

                    return supertest(app)
                        .post('/api/auth/login/')
                        .send(loginAttemptBody)
                        .expect(400, {
                            error: { message: `Missing '${field}' in request body` }
                        })
                })
            })

            it(`responds with 400 'invalid email or password' when bad email`, () => {
                const invalidUserEmail = { email: 'user-not', password: 'existy' };

                return supertest(app)
                    .post('/api/auth/login/')
                    .send(invalidUserEmail)
                    .expect(400, { error: `Incorrect email or password` })
            })
            it(`responds with 400 'invalid email or password' when bad password`, () => {
                const invalidUserPass = { email: testUser.email, password: 'existy' };

                return supertest(app)
                    .post('/api/auth/login/')
                    .send(invalidUserPass)
                    .expect(400, { error: `Incorrect email or password` })
            })

            it(`responds 200 and JWT auth token using secret when valid creds`, () => {
                const userValidCreds = {
                    email: testUser.email,
                    password: 'Password123'
                }
                const user = {
                    email: testUser.email,
                    id: testUser.id,
                    name: testUser.name,
                    pairData: [],
                    poolData: []
                }

                const expectedToken = jwt.sign(
                    {user_id: testUser.id},
                    process.env.JWT_SECRET,
                    {
                        subject: testUser.email,
                        algorithm: 'HS256'
                    }
                )

                return supertest(app)
                    .post('/api/auth/login')
                    .send(userValidCreds)
                    .expect(200, {
                        authToken: expectedToken,
                        user
                    })
            })


        })
    })



})