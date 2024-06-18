import { DevelopmentCard, Gem } from "../components/DevelopmentCard";
import { Player } from "../components/PlayerBoard";
import { GemType } from "../components/Tokens";

export interface WebsocketRequest {
  playerId: string;
  selectedGems?: GemType[];
  purchasedCard?: DevelopmentCard;
  reservedCard?: DevelopmentCard;
  status: GameStatus;
}

export interface WebsocketResponse {
  currentPlayerId: string;
  players: Player[];
  gems: Record<GemType, number>;
  nobles: DevelopmentCard[];
  developmentTiles: DevelopmentTiles;
  state: GameStatus;
}

export interface DevelopmentTiles {
  level1: DevelopmentCard[];
  level2: DevelopmentCard[];
  level3: DevelopmentCard[];
}

export type GameStatus = "Waiting" | "Started" | "End" | "CloseConnection";
