import { useEffect, useState, useRef } from 'react';
import './StatsSection.css';

interface StatItem {
  value: number | string;
  label: string;
  color: 'purple' | 'cyan' | 'pink';
  prefix?: string;
  suffix?: string;
  animate?: boolean;
}

interface StatsSectionProps {
  className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);


  const stats: StatItem[] = [
    {
      value: 10000,
      label: 'Active Players',
      color: 'purple',
      suffix: '+',
      animate: true
    },
    {
      value: 2000000,
      label: 'Fair Launch Deposits',
      color: 'cyan',
      prefix: '$',
      suffix: '+',
      animate: true
    },
    {
      value: 6,
      label: 'Games',
      color: 'pink',
      suffix: '+',
      animate: true
    }
  ];

  // Intersection Observer to trigger animation when component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Count-up animation effect
  useEffect(() => {
    if (!isVisible) return;

    const animateValue = (
      start: number,
      end: number,
      duration: number,
      key: string
    ) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        setAnimatedValues(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Start animations for numeric values
    stats.forEach((stat, index) => {
      if (stat.animate && typeof stat.value === 'number') {
        const duration = 2000 + (index * 200); // Stagger animations
        setTimeout(() => {
          animateValue(0, stat.value as number, duration, `stat-${index}`);
        }, index * 100);
      }
    });
  }, [isVisible]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  const getDisplayValue = (stat: StatItem, index: number): string => {
    if (!stat.animate || typeof stat.value !== 'number') {
      return stat.value.toString();
    }

    const animatedValue = animatedValues[`stat-${index}`] || 0;
    return formatNumber(animatedValue);
  };

  return (
    <div ref={sectionRef} className={`stats-section ${className}`}>
      <div className="hero-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className={`stat-number ${stat.color}`}>
              {stat.prefix || ''}
              {getDisplayValue(stat, index)}
              {stat.suffix || ''}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
