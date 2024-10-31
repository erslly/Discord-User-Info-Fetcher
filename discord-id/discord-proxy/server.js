require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getUserInfo', async (req, res) => {
  const discordId = req.query.discordId;

  if (!discordId) {
    return res.status(400).send({ error: 'Lütfen bir Discord ID sağlayın.' });
  }

  try {
    const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Kullanıcı bilgileri alınamadı.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy sunucusu http://localhost:${PORT} üzerinde çalışıyor`);
});
