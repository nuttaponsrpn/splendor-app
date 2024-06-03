"use client";
import { GameState } from "./GameBoard";

export const initialGameState: GameState = {
  currentPlayer: {
    id: 1,
    gems: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0 },
    reservedCards: [],
    purchasedCards: [],
    points: 0,
  },
  players: [
    {
      id: 1,
      gems: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0 },
      reservedCards: [],
      purchasedCards: [],
      points: 0,
    },
    {
      id: 2,
      gems: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0 },
      reservedCards: [],
      purchasedCards: [],
      points: 0,
    },
    {
      id: 3,
      gems: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0 },
      reservedCards: [],
      purchasedCards: [],
      points: 0,
    },
  ],
  gemTokens: { diamond: 7, sapphire: 7, emerald: 7, ruby: 7, onyx: 7 },
  developmentCards: [
    // Level 1 Cards
    {
      id: 1,
      level: 1,
      cost: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 0 },
      points: 0,
      gemType: "diamond",
    },
    {
      id: 2,
      level: 1,
      cost: { diamond: 0, sapphire: 0, emerald: 0, ruby: 1, onyx: 0 },
      points: 0,
      gemType: "diamond",
    },
    {
      id: 3,
      level: 1,
      cost: { diamond: 0, sapphire: 0, emerald: 0, ruby: 0, onyx: 1 },
      points: 0,
      gemType: "diamond",
    },
    {
      id: 4,
      level: 1,
      cost: { diamond: 0, sapphire: 0, emerald: 1, ruby: 1, onyx: 0 },
      points: 1,
      gemType: "diamond",
    },
    {
      id: 5,
      level: 1,
      cost: { diamond: 0, sapphire: 0, emerald: 0, ruby: 2, onyx: 0 },
      points: 1,
      gemType: "diamond",
    },
    // Add more level 1 cards as needed
    // Level 2 Cards
    {
      id: 6,
      level: 2,
      cost: { diamond: 0, sapphire: 0, emerald: 2, ruby: 1, onyx: 0 },
      points: 2,
      gemType: "diamond",
    },
    {
      id: 7,
      level: 2,
      cost: { diamond: 0, sapphire: 1, emerald: 1, ruby: 1, onyx: 1 },
      points: 2,
      gemType: "diamond",
    },
    {
      id: 8,
      level: 2,
      cost: { diamond: 0, sapphire: 2, emerald: 2, ruby: 0, onyx: 0 },
      points: 3,
      gemType: "diamond",
    },
    // Add more level 2 cards as needed
    // Level 3 Cards
    {
      id: 9,
      level: 3,
      cost: { diamond: 1, sapphire: 2, emerald: 1, ruby: 1, onyx: 1 },
      points: 4,
      gemType: "diamond",
    },
    {
      id: 10,
      level: 3,
      cost: { diamond: 0, sapphire: 3, emerald: 0, ruby: 2, onyx: 2 },
      points: 5,
      gemType: "diamond",
    },
    {
      id: 11,
      level: 3,
      cost: { diamond: 3, sapphire: 0, emerald: 0, ruby: 3, onyx: 0 },
      points: 5,
      gemType: "diamond",
    },
    // Add more level 3 cards as needed
  ],
  nobleTiles: [
    {
      id: 1,
      level: 0,
      cost: { diamond: 1, sapphire: 2, emerald: 1, ruby: 1, onyx: 1 },
      points: 3,
      gemType: "diamond",
    },
    {
      id: 2,
      level: 0,
      cost: { diamond: 3, sapphire: 0, emerald: 0, ruby: 3, onyx: 0 },
      points: 5,
      gemType: "diamond",
    },
    {
      id: 3,
      level: 0,
      cost: { diamond: 3, sapphire: 0, emerald: 0, ruby: 3, onyx: 0 },
      points: 3,
      gemType: "diamond",
    },
  ],
  selectedGem: [],
};
