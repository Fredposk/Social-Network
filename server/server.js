const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const app = express();
const db = require("./db");
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");

app.use(compression());
// Logging middleware
app.use(morgan("dev"));
// Security middleware
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
// Session cookies
let secrets;
if (process.env.cookie_secret) {
    secrets = process.env.cookie_secret;
} else {
    secrets = require("./secrets.json").sessionSecret;
}
// body-parser
app.use(express.urlencoded({ extended: false }));
// json handling
app.use(express.json());
// cookie handlers
app.use(
    cookieSession({
        name: "session",
        keys: [secrets],
        // Cookie Options 24hrs
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    // if not logged in redirect away from home
    if (req.session.userID) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    try {
        const userID = await db.newUser(first, last, email, password);
        req.session.userID = userID.rows[0].user_id;
        res.redirect("/");
    } catch (error) {
        console.log("error at the server-side reg", error);
    }

    res.status(200);
});

app.get("*", function (req, res) {
    if (!req.session.userID) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`I'm listening on ${PORT}`);
});
