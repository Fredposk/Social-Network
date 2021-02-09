const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
// validator
const { check, validationResult } = require("express-validator");
const csurf = require("csurf");
const app = express();
const db = require("./db");
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
// Crypto random string
const cryptoRandomString = require("crypto-random-string");
//
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
// Csurf Protection Options
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    // if not logged in redirect away from home
    if (req.session.userID) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post(
    "/registration",
    [
        check("first", "You must enter a first name").notEmpty(),
        check("last", "You must enter a last name").notEmpty(),
        check("email", "Make sure this is a valid email")
            .notEmpty()
            .normalizeEmail(),
        check("password", "Check password is more than 6 characters").isLength(
            "6"
        ),
    ],
    async (req, res) => {
        const { first, last, email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).json({ errors: errors });
        } else {
            const salt = await bcrypt.genSalt(10);
            const bryptedPassword = await bcrypt.hash(password, salt);
            try {
                const userID = await db.newUser(
                    first,
                    last,
                    email,
                    bryptedPassword
                );
                req.session.userID = userID.rows[0].user_id;
                res.redirect("/");
            } catch (error) {
                console.log("error at the server-side reg", error);
            }
        }
    }
);

app.post("/login", async (req, res) => {
    console.log(req.body);
});

app.post("/password/reset/start", async (req, res) => {
    console.log(" I am here /password/reset/start");
    // things to do Here
    // check that email is valid
    // send the email
    // generate secret code
    // Select query to view users in the table
    const secretCode = cryptoRandomString({
        length: 6,
    });
    // Create a new table for secret code stuff
    // Generate code in new table
    // use send mail to send an email to this users
});

app.post("/password/reset/verify", async (req, res) => {
    console.log(" I am here /password/reset/verify");
    // retrieve the code from new table
    // check if code is correct
});

app.post("/passwordrecoveremail", async (req, res) => {
    console.log("received email");
});

app.get("*", function (req, res) {
    if (!req.session.userID) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`I'm listening on ${PORT}`);
});
