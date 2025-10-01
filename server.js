const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core'); // For YouTube

const app = express();
app.use(cors());

app.get('/extract', async (req, res) => {
  const url = req.query.url;
  try {
    if (ytdl.validateURL(url)) {
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
      res.json({ success: true, videoUrl: format.url });
    } else {
      res.json({ success: false, error: 'Invalid or unsupported URL' });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));