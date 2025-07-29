const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Carica la pagina webcam Ecowitt
    await page.goto("https://www.ecowitt.net/home/index2?id=249399", {
      waitUntil: "networkidle2",
      timeout: 20000,
    });

    // Estrai l'URL dell'immagine jpg dal DOM
    const imageUrl = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const jpgImgs = imgs.filter(img => img.src && img.src.endsWith('.jpg'));
      return jpgImgs.length > 0 ? jpgImgs[0].src : null;
    });

    await browser.close();

    if (imageUrl) {
      res.redirect(imageUrl);
    } else {
      res.status(404).send("Nessuna immagine trovata.");
    }
  } catch (err) {
    res.status(500).send("Errore: " + err.message);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server avviato sulla porta " + port));
