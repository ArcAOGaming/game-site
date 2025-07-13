import { createContext } from 'react';
import { BazarProfile } from '../types';

export interface BazarContextType {
  bazarProfile: BazarProfile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

export const BazarContext = createContext<BazarContextType | undefined>(undefined);
