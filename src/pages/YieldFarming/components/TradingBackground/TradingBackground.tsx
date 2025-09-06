import './TradingBackground.css';

function TradingBackground() {
    return (
        <>
            {/* Trading Background Layers */}
            <div className="trading-bg-layer-1"></div>
            <div className="trading-bg-layer-2"></div>
            <div className="trading-flow-layer"></div>
            <div className="grid-overlay"></div>

            {/* Trading Data Streams */}
            <div className="trading-streams">
                <div className="data-stream stream-1"></div>
                <div className="data-stream stream-2"></div>
                <div className="data-stream stream-3"></div>
                <div className="data-stream stream-4"></div>
                <div className="data-stream stream-5"></div>
            </div>

            {/* Floating Trading Elements */}
            <div className="trading-elements">
                <div className="trading-node node-1">
                    <div className="node-pulse"></div>
                    <span className="node-value">+12.5%</span>
                </div>
                <div className="trading-node node-2">
                    <div className="node-pulse"></div>
                    <span className="node-value">$2.4M</span>
                </div>
                <div className="trading-node node-3">
                    <div className="node-pulse"></div>
                    <span className="node-value">15.2%</span>
                </div>
                <div className="trading-node node-4">
                    <div className="node-pulse"></div>
                    <span className="node-value">+8.7%</span>
                </div>
            </div>
        </>
    );
}

export default TradingBackground;
