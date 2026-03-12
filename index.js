const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("FroxenMC backend running");
});

app.get("/api/test", (req, res) => {
    res.json({
        status: "ok",
        message: "API working"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
});
