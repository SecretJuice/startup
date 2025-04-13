const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const logger = require("express-requests-logger");
const uuid = require("uuid");
const app = express();
const DB = require("./database.js");

const authCookieName = "token";

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
    logger({
        request: {
            excludeHeaders: [`*`],
            excludeBody: [`*`],
        },
        response: {
            excludeHeaders: [`*`],
            excludeBody: [`*`],
        },
    }),
);

app.use(express.static("public"));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post("/auth/create", async (req, res) => {
    if (await findUser("username", req.body.username)) {
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post("/auth/login", async (req, res) => {
    console.log("RECEIVED REQUEST");
    const user = await findUser("username", req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            return;
        }
    }
    res.status(401).send({ msg: "Unauthorized" });
});

apiRouter.delete("/auth/logout", async (req, res) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const userAuthMw = async (req, res, next) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
};
const anonAuthMw = async (req, res, next) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
};

// Error Handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile("index.html", { root: "public" });
});

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    console.log(value);
    if (field === "token") {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
