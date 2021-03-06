const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

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

module.exports.getFriendsList = (id) => {
    const q = `SELECT gituser.id, name, avatar_url
    FROM friendships
    JOIN gituser
    ON (accepted = true AND sender_id = $1 AND recipient_id = gituser.id)
    OR (accepted = true AND sender_id = gituser.id AND recipient_id = $1)`;
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

module.exports.friendStatus = (id, user) => {
    const q = `SELECT * FROM friendships
WHERE (recipient_id = $1 AND sender_id = $2)
OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [id, user];
    return db.query(q, params);
};

module.exports.makeFriendRequest = (id, otherUser) => {
    const q = `insert into friendships (sender_id, recipient_id) values ($1, $2) returning accepted;`;
    const params = [id, otherUser];
    return db.query(q, params);
};

module.exports.relationshipstatus = (otherUser, currUser) => {
    const q = `select accepted from friendships WHERE (sender_id = $2 and recipient_id = $1)`;
    const params = [otherUser, currUser];
    return db.query(q, params);
};

module.exports.deleteFriendship = (id, otherUser) => {
    const q = `delete FROM friendships
WHERE (recipient_id = $1 AND sender_id = $2)
OR (recipient_id = $2 AND sender_id = $1)
`;
    const params = [id, otherUser];
    return db.query(q, params);
};

module.exports.recipient = (id, otherUser) => {
    const q = `select accepted from friendships WHERE recipient_id = $1 and sender_id = $2`;
    const params = [id, otherUser];
    return db.query(q, params);
};

module.exports.acceptRequest = (id, otherUser) => {
    const q = `update friendships set accepted = true where recipient_id = $1 and sender_id = $2;`;
    const params = [id, otherUser];
    return db.query(q, params);
};

module.exports.friendsWithTom = (id) => {
    const q = `insert into friendships (sender_id, recipient_id, accepted) values ($1, 666666, true);`;
    const params = [id];
    return db.query(q, params);
};

module.exports.GetFriendsList = (id) => {
    const q = `
 SELECT gituser.id, name, avatar_url, accepted
    FROM friendships
    JOIN gituser
    ON (accepted = false AND sender_id = gituser.id AND recipient_id = $1)
    OR (accepted = true AND sender_id = $1 AND recipient_id = gituser.id)
    OR (accepted = true AND sender_id = gituser.id AND recipient_id = $1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.updateFeed = (feed, id) => {
    const q = `update gituser set feed = $1 where id = $2 returning feed`;
    const params = [feed, id];
    return db.query(q, params);
};

module.exports.prevMessages = () => {
    const q = `SELECT
  chat.sender_id,
  chat.message,
  chat.created_at,
  gituser.name,
  gituser.avatar_url,
  chat.id
FROM
  chat
  JOIN gituser ON sender_id = gituser.id
ORDER BY
  chat.created_at DESC
LIMIT
  9`;
    return db.query(q);
};

module.exports.newMessage = (sender, message) => {
    const q = `insert into chat (sender_id, message) Values ($1, $2);`;
    const params = [sender, message];
    return db.query(q, params);
};

module.exports.mostRecentMessage = () => {
    const q = `SELECT
  chat.sender_id,
  chat.message,
  chat.created_at,
  gituser.name,
  gituser.avatar_url,
  chat.id
FROM
  chat
  JOIN gituser ON sender_id = gituser.id
ORDER BY
  chat.created_at DESC
LIMIT
  1`;
    return db.query(q);
};

module.exports.getMyNotes = (id) => {
    const q = `select * from notes where user_id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.updatePosition = (x, y, id) => {
    const q = `UPDATE notes SET layerx = $1,  layery = $2 where note_id = $3
`;
    const params = [x, y, id];
    return db.query(q, params);
};

module.exports.addNewNote = (note_text, layery, layerx, user_id) => {
    const q = `insert into notes (note_text, layery, layerx, user_id) values ($1, $2, $3, $4) returning note_id`;
    const params = [note_text, layery, layerx, user_id];
    return db.query(q, params);
};

module.exports.removeNote = (id) => {
    const q = `delete from notes where note_id = $1`;
    const params = [id];
    return db.query(q, params);
};
