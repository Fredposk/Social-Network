const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { uploader } = require("./upload");
const s3 = require("./s3");
const { compare } = bcrypt;
const fetch = require("node-fetch");
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
// app.use(csurf());
// app.use(function (req, res, next) {
//     res.cookie("mytoken", req.csrfToken());
//     next();
// });

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

// log in with gituser ID
app.get("/home", async (req, res) => {
    const { clientID, clientSecret } = require("./secrets.json");
    const requestToken = req.query.code;
    axios({
        method: "post",
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: "application/json",
        },
    }).then((response) => {
        const accessToken = response.data.access_token;
        fetch("https://api.github.com/user", {
            headers: {
                Authorization: "token " + accessToken,
            },
        })
            .then((data) => data.json())
            .then((data) => {
                const gitUser = async () => {
                    const { login, id, name, avatar_url } = data;
                    const userID = await db.checkGitUser(id);
                    //
                    if (userID.rows.length === 0) {
                        const userID = await db.createGitUser(
                            login,
                            id,
                            name,
                            avatar_url
                        );
                        // console.log(userID.rows[0].id);
                        req.session.userID = userID.rows[0].id;
                        res.redirect("/");
                    } else {
                        // console.log(userID.rows[0].id);
                        req.session.userID = userID.rows[0].id;
                        res.redirect("/");
                    }
                };
                gitUser();
            });
    });
});

app.post(
    "/login",
    [check("email", "type your email").notEmpty()],

    async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(201).json({ errors: errors });
        } else {
            try {
                // Lets check against the database
                const AttemptLog = await db.logAttempt(email);
                const match = await compare(
                    password,
                    AttemptLog.rows[0].password
                );
                if (match) {
                    console.log("sucessfully logged in");
                    req.session.userID = AttemptLog.rows[0].user_id;
                    res.redirect("/");
                }
            } catch (error) {
                console.log("here is a error at the login, server");
            }
        }
    }
);

// Password recovery in gitignore, may or may not allow users without git 🤔

app.get("/userdata", async (req, res) => {
    const userCookie = req.session.userID;
    const details = await db.checkGitUser(userCookie);
    res.status(200).json({ details });
});

app.post(
    "/userdata/profile/picture",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        const { s3Url } = require("./secrets.json");
        const { filename } = req.file;
        const url = `${s3Url}${filename}`;
        try {
            const newPic = await db.updateGitPicture(url, req.session.userID);
            res.status(200).json({ newPic });
        } catch (error) {
            console.log("error uploading or updating picture, server");
        }
    }
);

app.post("/userdata/profile/bio", async (req, res) => {
    const { newBio } = req.body;
    try {
        const bio = await db.updateBio(newBio, req.session.userID);
        res.status(200).json({ bio });
    } catch (error) {
        console.log("error updating bio, server");
    }
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
