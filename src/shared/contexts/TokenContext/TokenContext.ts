import { createContext } from "react";
import { TokenContextType } from "./types";

export const TokenContext = createContext<TokenContextType | undefined>(undefined);
