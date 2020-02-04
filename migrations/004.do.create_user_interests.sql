CREATE TABLE user_interests (
    id INTEGER REFERENCES users(id),
    interest TEXT
)