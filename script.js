const sound = document.getElementById("sound");

let user = "";
let room = "";
let score = 0;
let currentAnswer = "";
let currentClue = "";

// 🔥 DATABASE DASAR (akan digandakan)
const baseAnimals = [
  "kucing","anjing","ayam","sapi","kambing","ikan","burung","bebek",
  "kelinci","kuda","harimau","singa","gajah","jerapah","zebra",
  "buaya","ular","elang","hiu","lumba-lumba","paus","badak","tapir",
  "komodo","platipus","axolotl","okapi","narwhal","cassowary",
  "aardvark","alpaka","antelope","armadillo","baboon","bison",
  "caracal","cheetah","chinchilla","coyote","dingo","dugong",
  "ferret","gazelle","hyena","ibex","impala","jaguar","lemur",
  "marten","meerkat","mole","mongoose","ocelot","pangolin",
  "quokka","raccoon","reindeer","salamander","serval","sloth",
  "stoat","tarsius","uakari","vicuna","wolverine","yak","zorilla"
];

// 🔥 GENERATE >10.000 SOAL
const animals = [];
for (let i = 0; i < 150; i++) {
  baseAnimals.forEach(a => animals.push(a));
}

// 🔍 BUAT CLUE MODEL A_am
function buatClue(jawaban) {
  if (jawaban.length <= 2) return jawaban;

  let clue = jawaban[0];
  for (let i = 1; i < jawaban.length - 1; i++) {
    clue += "_";
  }
  clue += jawaban[jawaban.length - 1];
  return clue;
}

function startGame() {
  user = document.getElementById("username").value.trim();
  room = document.getElementById("room").value.trim();

  if (!user || !room) return alert("Username & Room wajib diisi");

  document.getElementById("login").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  score = Number(localStorage.getItem(room + "_" + user)) || 0;
  updateStatus();
  newQuestion();
}

function newQuestion() {
  currentAnswer = animals[Math.floor(Math.random() * animals.length)];
  currentClue = buatClue(currentAnswer);

  document.getElementById("hint").innerText =
    `Hewan apakah ini? (${currentAnswer.length} huruf)`;
  document.getElementById("clue").innerText =
    `Clue: ${currentClue}`;

  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  const input = document.getElementById("answer").value
    .toLowerCase()
    .trim();

  if (!input) return;

  if (input === currentAnswer) {
    score += 10;
    sound.play();
    document.getElementById("result").innerText = "✅ BENAR!";
    saveScore();

    sendTelegram(
`🎮 GAME TEBAK HEWAN
👤 User: ${user}
🏠 Room: ${room}
❓ Soal: Hewan ${currentAnswer.length} huruf
🔍 Clue: ${currentClue}
✏️ Jawaban: ${input}
✅ BENAR
⭐ Skor: ${score}`
    );

    newQuestion();
  } else {
    document.getElementById("result").innerText = "❌ SALAH! Coba lagi";

    sendTelegram(
`🎮 GAME TEBAK HEWAN
👤 User: ${user}
🏠 Room: ${room}
❓ Soal: Hewan ${currentAnswer.length} huruf
🔍 Clue: ${currentClue}
✏️ Jawaban: ${input}
❌ SALAH
⭐ Skor: ${score}`
    );
  }

  updateStatus();
}

function saveScore() {
  localStorage.setItem(room + "_" + user, score);
}

function updateStatus() {
  document.getElementById("score").innerText = score;
  document.getElementById("status").innerText =
    `User: ${user} | Room: ${room}`;
}

// 🔥 KIRIM KE TELEGRAM (LEWAT SERVER)
function sendTelegram(message) {
  fetch("https://SERVER-KAMU.onrender.com/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  }).catch(() => {});
}
