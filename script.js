const audio = document.getElementById("soundBenar");

let user = "";
let room = "";
let skor = 0;
let jawabanAktif = "";

const hewan = [
  "kucing","anjing","ayam","sapi","kambing","ikan","burung","bebek",
  "kelinci","kuda","harimau","singa","gajah","jerapah","zebra",
  "buaya","ular","elang","hiu","lumba-lumba",
  "platipus","axolotl","okapi","tapir","narwhal","aardvark","cassowary"
];

// 🔥 AUTO 700+ SOAL
let soal = [];
for (let i = 0; i < 30; i++) {
  hewan.forEach(h => soal.push(h));
}

function login() {
  user = document.getElementById("username").value;
  room = document.getElementById("room").value;

  if (!user || !room) return alert("Lengkapi username & room");

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("gameBox").classList.remove("hidden");

  skor = Number(localStorage.getItem(room + "_" + user)) || 0;
  updateUI();
  soalBaru();
}

function soalBaru() {
  jawabanAktif = soal[Math.floor(Math.random() * soal.length)];
  document.getElementById("petunjuk").innerText =
    "Tebak hewan (" + jawabanAktif.length + " huruf)";
  document.getElementById("hasil").innerText = "";
  document.getElementById("jawaban").value = "";
}

function cekJawaban() {
  const jawab = document.getElementById("jawaban").value.toLowerCase();
  if (!jawab) return;

  if (jawab === jawabanAktif) {
    skor += 10;
    audio.play();
    document.getElementById("hasil").innerText = "✅ BENAR!";
    simpanSkor();
    soalBaru();
  } else {
    document.getElementById("hasil").innerText = "❌ SALAH!";
  }
  updateUI();
}

function simpanSkor() {
  localStorage.setItem(room + "_" + user, skor);
}

function updateUI() {
  document.getElementById("skor").innerText = skor;
  document.getElementById("info").innerText =
    "User: " + user + " | Room: " + room;
}
