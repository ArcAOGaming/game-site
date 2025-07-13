import { createContext } from "react";
import { EthereumWalletTokensContextType } from "./types";

export const EthereumWalletTokensContext = createContext<EthereumWalletTokensContextType | undefined>(undefined);
