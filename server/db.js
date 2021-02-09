const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.newUser = (firstName, lastName, email, password) => {
    const q = `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id`;
    const params = [firstName, lastName, email, password];
    return db.query(q, params);
};

module.exports.logAttempt = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};
