import React from 'react';
import './StatItem.css';

interface StatItemProps {
    value: React.ReactNode;
    label: string;
    colorClass?: 'ownership' | 'earning';
}

function StatItem({ value, label, colorClass }: StatItemProps) {
    return (
        <div className="stat-item">
            <div className={`stat-number ${colorClass || ''}`}>
                {value}
            </div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

export default StatItem;
