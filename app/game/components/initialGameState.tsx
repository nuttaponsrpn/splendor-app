"use client";
import { GameState } from "./GameBoard";

export const initialGameState: GameState = {
  playerTurn: "",
  currentPlayer: {
    id: "",
    gems: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0, joker: 0 },
    reservedCards: [],
    purchasedCards: [],
    points: 0,
    nobleCards: [],
  },
  players: [],
  gemTokens: {
    diamond: 7,
    sapphire: 7,
    emerald: 7,
    ruby: 7,
    onyx: 7,
    joker: 7,
  },
  developmentCards: [],
  nobleTiles: [],
  selectedGem: [],
};
