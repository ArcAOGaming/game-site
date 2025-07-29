import React from 'react';
import './AiFlowAnimation.css';

interface AiFlowAnimationProps {
    className?: string;
}

const AiFlowAnimation: React.FC<AiFlowAnimationProps> = ({
    className = ''
}) => {
    return (
        <div className={`ai-flow-animation ${className}`}>
            {/* Visible stock graph line */}
            <svg className="stock-graph-line" viewBox="0 0 400 300" preserveAspectRatio="none">
                <path
                    className="graph-path"
                    d="M 40 240 Q 100 200 160 160 Q 200 170 240 120 Q 280 130 320 80 Q 340 85 360 60"
                    fill="none"
                    stroke="rgba(102, 126, 234, 0.6)"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                />
            </svg>

            {/* Moving AI Logo */}
            <div className="ai-logo-moving">
                <img
                    src="/logo-white-transparent.png"
                    alt="$GAME AI"
                    className="ai-logo"
                />
            </div>
        </div>
    );
};

export default AiFlowAnimation;
