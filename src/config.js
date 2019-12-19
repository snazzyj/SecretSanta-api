module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://Alex:1@localhost/secret-santa-test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
  }