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
    diamond: 0,
    sapphire: 0,
    emerald: 0,
    ruby: 0,
    onyx: 0,
    joker: 0,
  },
  developmentCards: [],
  nobleTiles: [],
  selectedGem: [],
};
