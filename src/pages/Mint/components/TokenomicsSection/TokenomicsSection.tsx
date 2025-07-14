import React from 'react';
import './TokenomicsSection.css';
import { useGameToken } from '../../../../shared/contexts';
import { formatBigNumberTokenAmount } from '../../../../utils/formatting';

const TokenomicsSection: React.FC = () => {
    const { totalSupply, circulatingSupply, isLoadingTokenData } = useGameToken();

    return (
        <div className="tokenomics-section">
            <div className="tokenomics-card">
                <div className="tokenomics-header">
                    <div className="tokenomics-icon">
                        <img src="/game-token.png" alt="GAME Token" />
                    </div>
                    <h3 className="tokenomics-title">Tokenomics</h3>
                </div>

                <div className="tokenomics-content">
                    <div className="tokenomics-item">
                        <span className="tokenomics-highlight">
                            {isLoadingTokenData ? 'Loading...' : formatBigNumberTokenAmount(totalSupply, 18)}
                        </span>
                        <span className="tokenomics-label">Total Supply</span>
                    </div>

                    <div className="tokenomics-item">
                        <span className="tokenomics-highlight">
                            {isLoadingTokenData ? 'Loading...' : formatBigNumberTokenAmount(circulatingSupply, 18)}
                        </span>
                        <span className="tokenomics-label">Circulating Supply</span>
                    </div>

                    <div className="tokenomics-item">
                        <span className="tokenomics-highlight">0%</span>
                        <span className="tokenomics-label">VC Allocation</span>
                    </div>

                    <div className="tokenomics-item">
                        <span className="tokenomics-highlight">Exchange Listing</span>
                        <span className="tokenomics-label">Imminent - Your Early</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenomicsSection;
