import data from "@/data/board-games.json";

const BASE_IMAGE_URL = "https://szandala.github.io/piwo-api/";

export function getAllGames() {
  return data.board_games.map((game) => ({
    ...game,
    images: game.images.map((img) => BASE_IMAGE_URL + img),
  }));
}

export function getGameById(id) {
  const games = getAllGames();
  return games.find((game) => game.id === Number(id));
}

export function getGameTypes() {
  const games = getAllGames();
  const types = games.map((game) => game.type);
  return [...new Set(types)].sort();
}