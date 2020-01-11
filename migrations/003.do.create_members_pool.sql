CREATE TABLE members_pool (
    pool_id INTEGER REFERENCES pool_table(pool_id),
    email TEXT REFERENCES users(email),
    giftee TEXT REFERENCES users(email),
    confirmation BOOLEAN,
    confirmation_code INTEGER
)