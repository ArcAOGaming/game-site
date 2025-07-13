import { createContext } from 'react';
import { AODAIStakingContextType } from './types';

export const AODAIStakingContext = createContext<AODAIStakingContextType | undefined>(undefined);
