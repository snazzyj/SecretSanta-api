module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://Alex:1@localhost/secret-santa-test',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://Alex:1@localhost/secret-santa',
    JWT_SECRET: process.env.JWT_SECRET || 'my-own-special-jwt-secret',
    EMAIL_PASS: 'thinkfulsanta123',
  }