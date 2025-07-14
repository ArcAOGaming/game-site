import { createContext } from "react";
import { GameTokenContextType } from "./types";

export const GameTokenContext = createContext<GameTokenContextType | undefined>(undefined);
