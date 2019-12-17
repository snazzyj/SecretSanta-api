CREATE TABLE user_interests (
    email TEXT REFERENCES users(email),
    interest TEXT
)