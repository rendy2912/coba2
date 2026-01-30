const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = "BOT_TOKEN_KAMU";
const CHAT_ID = "CHAT_ID_KAMU";

app.post("/telegram", async (req, res) => {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: req.body.message
    })
  });
  res.send({ ok: true });
});

app.listen(3000);
