const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.get("/api/test", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/login", (req, res) => {
    users.push(req.body.user);
    res.json({ ok: true });
});

app.get("/api/users", (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
