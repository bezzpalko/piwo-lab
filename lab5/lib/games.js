import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  limit,
  startAfter,
  orderBy,
  updateDoc,
} from "firebase/firestore";

const BASE_IMAGE_URL = "https://szandala.github.io/piwo-api/";

const fixGameImages = (game) => ({
  ...game,
  images:
    game.images?.map((img) => {
      if (img.startsWith("http")) return img;
      
      return img.startsWith("/") ? img : "/" + img;
    }) || [],
});

export async function getAllGamesFromFirestore() {
  const gamesRef = collection(db, "games");
  const q = query(gamesRef, orderBy("title"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docItem) => ({
    ...fixGameImages(docItem.data()),
    id: docItem.id,
  }));
}

export async function getGamesFromFirestore(pageSize = 6, lastVisible = null) {
  const gamesRef = collection(db, "games");
  let q;

  if (lastVisible) {
    q = query(
      gamesRef,
      orderBy("title"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  } else {
    q = query(gamesRef, orderBy("title"), limit(pageSize));
  }

  const querySnapshot = await getDocs(q);
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  const games = querySnapshot.docs.map((docItem) => ({
    ...fixGameImages(docItem.data()),
    id: docItem.id,
  }));

  return { games, lastDoc };
}

export async function getGameById(id) {
  const docRef = doc(db, "games", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return fixGameImages({
      ...docSnap.data(),
      id: docSnap.id,
    });
  } else {
    return null;
  }
}

export async function buyGameInFirestore(id) {
  const gameRef = doc(db, "games", id);

  await updateDoc(gameRef, {
    available: false,
  });
}

export async function restoreGameAvailability(id) {
  const gameRef = doc(db, "games", id);

  await updateDoc(gameRef, {
    available: true,
  });
}