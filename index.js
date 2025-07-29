const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server funzionante, Puppeteer disabilitato per test");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server avviato sulla porta " + port));

