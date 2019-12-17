CREATE TABLE members_pool (
    confirmation BOOLEAN,
    pool_id INTEGER REFERENCES pool_table(pool_id),
    email TEXT REFERENCES users(email),
    giftee TEXT REFERENCES users(email)
)