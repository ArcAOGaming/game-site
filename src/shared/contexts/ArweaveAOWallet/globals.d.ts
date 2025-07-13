declare global {
  interface Window {
    arweaveWallet?: {
      connect(permissions: string[]): Promise<void>;
      disconnect(): Promise<void>;
      getActiveAddress(): Promise<string>;
      getPermissions(): Promise<string[]>;
      sign(transaction: unknown): Promise<unknown>;
    };
  }
}

export {};
