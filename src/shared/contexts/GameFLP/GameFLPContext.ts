import { createContext } from "react";
import { GameFLPContextType } from "./types";

export const GameFLPContext = createContext<GameFLPContextType | undefined>(undefined);
