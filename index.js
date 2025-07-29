const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/scrape", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto("https://amantea-webcam.agn19278.workers.dev/", {
      waitUntil: "networkidle2",
      timeout: 15000,
    });

    const content = await page.evaluate(() => document.body.innerText);
    await browser.close();

    const match = content.match(/https?:\/\/[^\s]+\.jpg/);
    if (match) {
      res.redirect(match[0]);
    } else {
      res.status(404).send("Nessuna immagine trovata.");
    }
  } catch (err) {
    res.status(500).send("Errore: " + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server avviato sulla porta " + port));

