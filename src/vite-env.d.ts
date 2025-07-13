/// <reference types="vite/client" />

interface ArweaveWallet {
  connect(permissions: string[]): Promise<void>;
  disconnect(): Promise<void>;
  getActiveAddress(): Promise<string>;
  getPermissions(): Promise<string[]>;
  sign(transaction: unknown): Promise<unknown>;
}

declare global {
  interface Window {
    arweaveWallet?: ArweaveWallet;
  }
}
