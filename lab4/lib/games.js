import { db } from "./firebase";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  limit, 
  startAfter, 
  orderBy 
} from "firebase/firestore";

const BASE_IMAGE_URL = "https://szandala.github.io/piwo-api/";

const fixGameImages = (game) => ({
  ...game,
  images: game.images?.map((img) => 
    img.startsWith('http') ? img : BASE_IMAGE_URL + img
  ) || [],
});

export async function getGamesFromFirestore(pageSize = 6, lastVisible = null) {
  const gamesRef = collection(db, "games");
  let q;

  if (lastVisible) {
    q = query(gamesRef, orderBy("title"), startAfter(lastVisible), limit(pageSize));
  } else {
    q = query(gamesRef, orderBy("title"), limit(pageSize));
  }

  const querySnapshot = await getDocs(q);
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  
  const games = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...fixGameImages(doc.data())
  }));

  return { games, lastDoc };
}

export async function getGameById(id) {
  const docRef = doc(db, "games", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return fixGameImages({ id: docSnap.id, ...docSnap.data() });
  } else {
    return null;
  }
}