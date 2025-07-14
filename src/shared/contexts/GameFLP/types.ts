export interface GameFLPContextType {
    recentDistribution: number | null;
    isLoadingDistribution: boolean;
    refreshDistribution: () => Promise<void>;
}

export interface GameFLPProviderProps {
    children: React.ReactNode;
}
