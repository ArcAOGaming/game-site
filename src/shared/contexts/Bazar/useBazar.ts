import { useContext } from 'react';
import { BazarContext } from './context';

export const useBazar = () => {
  const context = useContext(BazarContext);
  if (context === undefined) {
    throw new Error('useBazar must be used within a BazarProvider');
  }
  return context;
};
