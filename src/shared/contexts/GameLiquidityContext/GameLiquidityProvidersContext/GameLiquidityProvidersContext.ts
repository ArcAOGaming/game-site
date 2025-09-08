import { createContext } from "react";
import { GameLiquidityProvidersContextType } from "./types";

export const GameLiquidityProvidersContext = createContext<GameLiquidityProvidersContextType | undefined>(undefined);
