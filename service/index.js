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

const userAuthMw = async (req, res, next) => {
    const user = await findUser("token", req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
};

apiRouter.post("/auth/create", async (req, res) => {
    if (req.body.username == null || req.body.password == null) {
        res.status(400).send({ msg: "Bad Request" });
        return;
    }
    if (await findUser("username", req.body.username)) {
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post("/auth/login", async (req, res) => {
    if (req.body.username == null || req.body.password == null) {
        res.status(400).send({ msg: "Bad Request" });
        return;
    }
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

apiRouter.post("/events", userAuthMw, async (req, res) => {
    const event = {
        name: req.body.name,
        groupCapacity: req.body.groupCapacity,
        concluded: false,
    };
    await DB.createEvent(req.user, event);
    res.status(201).end();
});

apiRouter.get("/events", userAuthMw, async (req, res) => {
    const events = await DB.getEventsByUser(req.user);
    console.log(events);
    res.status(200).send(events);
});

apiRouter.get("/events/:code", userAuthMw, async (req, res) => {
    const code = req.params.code;
    const event = await DB.getEventByCode(req.user, code);
    if (event !== null) {
        res.status(200).send(event);
    } else {
        res.status(404).send({ msg: "Not Found" });
    }
});

apiRouter.put("/events/:code/settings", userAuthMw, async (req, res) => {
    const code = req.params.code;
    const event = await DB.getEventByCode(req.user, code);
    if (event !== null) {
        await DB.updateSettingsByCode(req.user, code, req.body);
        res.status(204).end();
    } else {
        res.status(404).send({ msg: "Not Found" });
    }
});

apiRouter.put("/events/:code/join", async (req, res) => {
    const joinInfo = await DB.joinEventWithCode(req.body.name, req.params.code);
    if (joinInfo === null) {
        res.status(404).send({ msg: "Not Found" });
    } else {
        res.status(202).send(joinInfo);
    }
});

apiRouter.put("/events/:code/groups/:name", async (req, res) => {
    await DB.callEventGroup(req.params.code, req.params.name, req.user)
});

// Error Handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, msg: err.message });
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
