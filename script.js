window.addEventListener("load", () => {
  console.log("✅ script.js hidup");

  const startBtn = document.getElementById("startBtn");
  const app = document.getElementById("app");

  if (!startBtn) {
    alert("❌ Tombol tidak ditemukan");
    return;
  }

  startBtn.addEventListener("click", () => {
    alert("🔥 TOMBOL HIDUP!");
    
    app.innerHTML = `
      <h2>🎮 Game berjalan</h2>
      <p>Kalau ini muncul, berarti JS 100% jalan</p>
    `;
  });
});
