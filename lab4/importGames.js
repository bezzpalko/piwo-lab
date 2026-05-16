const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./data/board-games.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importGames() {
  const games = data.board_games;

  for (const game of games) {
    await db.collection("games").doc(String(game.id)).set(game);
    console.log(`✓ ${game.id} - ${game.title}`);
  }

  console.log("✅ Готово! Усі ігри в Firestore.");
}

importGames().catch((err) => console.error("❌ Помилка:", err));