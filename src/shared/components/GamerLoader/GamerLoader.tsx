import './GamerLoader.css';

interface GamerLoaderProps {
    size?: 'small' | 'medium' | 'large';
    text?: string;
    variant?: 'primary' | 'secondary' | 'accent';
}

export function GamerLoader({
    size = 'medium',
    text = 'Loading...',
    variant = 'primary'
}: GamerLoaderProps) {
    return (
        <div className={`gamer-loader gamer-loader--${size} gamer-loader--${variant}`}>
            <div className="gamer-loader__spinner">
                <div className="gamer-loader__ring gamer-loader__ring--outer">
                    <div className="gamer-loader__segment"></div>
                    <div className="gamer-loader__segment"></div>
                    <div className="gamer-loader__segment"></div>
                    <div className="gamer-loader__segment"></div>
                </div>
                <div className="gamer-loader__ring gamer-loader__ring--inner">
                    <div className="gamer-loader__dot"></div>
                    <div className="gamer-loader__dot"></div>
                    <div className="gamer-loader__dot"></div>
                </div>
                <div className="gamer-loader__core">
                    <div className="gamer-loader__pulse"></div>
                </div>
            </div>
            {text && (
                <div className="gamer-loader__text">
                    <span className="gamer-loader__text-content">{text}</span>
                    <div className="gamer-loader__text-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                </div>
            )}
        </div>
    );
}
