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

    res.json({
        status: "ok"
    });

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



/* ---------- START SERVER ---------- */

app.get("/api/start/:name", (req, res) => {

    const name = req.params.name;

    const s = servers.find(
        x => x.name === name
    );

    if (!s) {

        return res.json({
            message: "Not found"
        });

    }

    s.status = "running";

    res.json({
        message: "Started",
        server: s
    });

});



/* ---------- STOP SERVER ---------- */

app.get("/api/stop/:name", (req, res) => {

    const name = req.params.name;

    const s = servers.find(
        x => x.name === name
    );

    if (!s) {

        return res.json({
            message: "Not found"
        });

    }

    s.status = "offline";

    res.json({
        message: "Stopped",
        server: s
    });

});



/* ---------- PORT ---------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Backend running on " + PORT);

});
