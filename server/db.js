const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

// module.exports.newUser = (firstName, lastName, email, password) => {
//     const q = `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id`;
//     const params = [firstName, lastName, email, password];
//     return db.query(q, params);
// };

module.exports.createGitUser = (login, id, name, avatar_url) => {
    const q = `INSERT INTO gituser (login, id, name, avatar_url) VALUES ($1, $2, $3, $4) RETURNING id;`;
    const params = [login, id, name, avatar_url];
    return db.query(q, params);
};
module.exports.updateGitPicture = (url, id) => {
    const q = `UPDATE gituser set avatar_url = $1 WHERE id = $2 RETURNING avatar_url;`;
    const params = [url, id];
    return db.query(q, params);
};

// module.exports.logAttempt = (email) => {
//     const q = `SELECT * FROM users WHERE email = $1`;
//     const params = [email];
//     return db.query(q, params);
// };
module.exports.checkGitUser = (id) => {
    const q = `SELECT * FROM gituser WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.updateBio = (bio, id) => {
    const q = `UPDATE gituser SET BIO = $1 WHERE id = $2 RETURNING bio`;
    const params = [bio, id];
    return db.query(q, params);
};

module.exports.getOtherUser = (id) => {
    const q = `select * from gituser where id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getNewUsers = (id) => {
    const q = `SELECT * FROM gituser where id != $1 ORDER BY created_at DESC LIMIT 3;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getSearchedUsers = (id, val) => {
    const q = `SELECT * FROM gituser WHERE id != $1 and name ILIKE $2;`;
    const params = [id, val + "%"];
    return db.query(q, params);
};
