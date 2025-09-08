import { createContext } from "react";
import { GameLiquidityContextType } from "./types";

export const GameLiquidityContext = createContext<GameLiquidityContextType | undefined>(undefined);
