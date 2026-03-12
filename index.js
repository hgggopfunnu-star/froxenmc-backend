const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



/* ---------- DATA ---------- */

let users = [];
let servers = [];



/* ---------- TEST ---------- */

app.get("/api/test", (req, res) => {
    res.json({ status: "ok" });
});



/* ---------- LOGIN ---------- */

app.post("/api/login", (req, res) => {

    users.push(req.body.user);

    res.json({
        ok: true
    });

});


app.get("/api/users", (req, res) => {
    res.json(users);
});



/* ---------- CREATE SERVER ---------- */

app.post("/api/create", (req, res) => {

    const { name, ram, version } = req.body;

    if (!name) {
        return res.json({
            message: "Name required"
        });
    }

    const server = {

        id: Date.now(),

        name: name,
        ram: ram,
        version: version,

        status: "offline"

    };

    servers.push(server);

    res.json({

        message: "Server created",
        server: server

    });

});



/* ---------- LIST SERVERS ---------- */

app.get("/api/servers", (req, res) => {

    res.json({
        servers: servers
    });

});



/* ---------- START ---------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Backend running");
});
