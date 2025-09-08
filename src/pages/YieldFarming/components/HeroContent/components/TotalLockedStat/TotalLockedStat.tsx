import React from 'react';
import StatItem from '../StatItem';

function TotalLockedStat() {
    return (
        <StatItem
            value="$3000+"
            label="Total Locked"
            colorClass="ownership"
        />
    );
}

export default TotalLockedStat;
