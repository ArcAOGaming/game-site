import React from 'react';
import { useGameLiquidity } from '../../../../../../shared/contexts/GameLiquidityContext';
import { RingLoader } from '../../../../../../shared/components';
import StatItem from '../StatItem';

function ActiveFarmersStat() {
    const {
        totalLPHolders,
        hasPartialProvidersData
    } = useGameLiquidity();

    const renderValue = () => {
        if (totalLPHolders === null) {
            return <RingLoader size={16} color="rgba(59, 130, 246, 1)" thickness={2} />;
        }

        return (
            <div className="flex items-center gap-1">
                <span style={{ color: 'rgba(59, 130, 246, 1)' }}>{totalLPHolders.toLocaleString()}</span>
                <span style={{ color: 'rgba(59, 130, 246, 1)' }}>+</span>
                {hasPartialProvidersData && (
                    <RingLoader size={12} color="rgba(59, 130, 246, 1)" thickness={1} />
                )}
            </div>
        );
    };

    return (
        <StatItem
            value={renderValue()}
            label="Catalyst Channelers"
            colorClass="ownership"
        />
    );
}

export default ActiveFarmersStat;
