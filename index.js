const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

exec('npm install @fongsidev/scraper', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing @fongsidev/scraper: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);

  const FongsiDev_Scraper = require('@fongsidev/scraper');

  app.get('/spotify', async (req, res) => {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    try {
      const result = await FongsiDev_Scraper.Spotify(url);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Error scraping the Spotify URL", details: error.toString() });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
