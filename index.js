const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

app.get("/", async (req, res) => {
  try {
    console.log("Avvio browser Puppeteer...");
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto("https://www.ecowitt.net/home/index2?id=249399", {
      waitUntil: "networkidle2",
      timeout: 20000,
    });

    const imageUrl = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const jpgImgs = imgs.filter(img => img.src && img.src.endsWith('.jpg'));
      return jpgImgs.length > 0 ? jpgImgs[0].src : null;
    });

    console.log("URL immagine estratta:", imageUrl);

    if (imageUrl) {
      res.redirect(imageUrl);
    } else {
      res.status(404).send("Nessuna immagine trovata.");
    }

    // Non chiudere subito il browser, lascialo aperto per 10 secondi
    setTimeout(async () => {
      console.log("Chiusura browser Puppeteer...");
      await browser.close();
    }, 10000);

  } catch (err) {
    console.error("Errore nell'elaborazione:", err);
    res.status(500).send("Errore: " + err.message);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server avviato sulla porta " + port));
