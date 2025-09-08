import './RingLoader.css';

interface RingLoaderProps {
    size?: number;
    color?: string;
    thickness?: number;
}

export function RingLoader({
    size = 20,
    color = '#8b5cf6',
    thickness = 3
}: RingLoaderProps) {
    return (
        <div
            className="ring-loader"
            style={{
                width: size,
                height: size,
                '--ring-color': color,
                '--ring-thickness': `${thickness}px`
            } as React.CSSProperties & { '--ring-color': string; '--ring-thickness': string }}
        >
            <div className="ring-loader__circle"></div>
        </div>
    );
}
