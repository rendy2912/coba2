const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TOKEN = "8219584591:AAF2Eq47TP3tCJZaesGElowLmIynp_8bxDo";
const CHAT_ID = "8055056557";

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
