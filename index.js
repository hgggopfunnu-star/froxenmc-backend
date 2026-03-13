const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());



/* ---------- DATA ---------- */

let users = [];
let servers = [];
let processes = {};



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

    if (processes[name]) {

        return res.json({
            message: "Already running"
        });

    }

    // fake process (safe for railway)

    const proc = spawn(
        "node",
        ["-e", "setInterval(()=>{},1000)"]
    );

    processes[name] = proc;

    s.status = "running";

    res.json({
        message: "Started"
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

    const p = processes[name];

    if (p) {

        p.kill();

        delete processes[name];

    }

    s.status = "offline";

    res.json({
        message: "Stopped"
    });

});



/* ---------- PORT ---------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        "Backend running on " + PORT
    );

});
