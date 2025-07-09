import { useEffect, useRef, useState } from 'react';
import { ARCAO, RUNEREALM } from '@arcaogaming/project-links';
import './VideoCarousel.css';

interface CarouselItem {
  id: string;
  type: 'video' | 'placeholder';
  src?: string;
  title?: string;
  icon?: string;
  link?: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 'video1',
    type: 'video',
    src: 'https://vphwoves2balumuaxe5rsbljbkkhhev22m2z22jlqkkbnetws2tq.ar.io/q89nVJLQQLoygLk7GQVpCpRzkrrTNZ1pK4KUFpJ2lqc',
    title: 'Game Video 1',
    link: RUNEREALM.gameSite
  },
  {
    id: 'video2',
    type: 'video',
    src: 'https://gfnoxx4rpevmj73fqqd2yhcakl7usqn4vz7qmeclttq3tn4kyuia.arweave.net/MVrr35F5KsT_ZYQHrBxAUv9JQbyufwYQS5zhubeKxRA',
    title: 'Game Video 2',
    link: ARCAO.website
  },
  {
    id: 'allgames',
    type: 'placeholder',
    title: 'All Games',
    icon: '🎮',
    link: ARCAO.website
  }
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const incrementerRef = useRef(0);

  useEffect(() => {
    // Set video playback rate to 2x
    videoRefs.current.forEach(video => {
      if (video) {
        video.playbackRate = 2.0;
      }
    });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNext = () => {
      // Get current item based on incrementer
      const currentItem = carouselItems[incrementerRef.current];
      const delay = currentItem.id === 'allgames' ? 5000 : 10000;
      
      timeoutId = setTimeout(() => {
        // Increment the counter
        incrementerRef.current = (incrementerRef.current + 1) % carouselItems.length;
        
        // Update the display index
        setCurrentIndex(incrementerRef.current);
        
        // Schedule the next transition
        scheduleNext();
      }, delay);
    };

    // Start the first cycle after 10 seconds (Video1 is showing initially)
    timeoutId = setTimeout(() => {
      incrementerRef.current = (incrementerRef.current + 1) % carouselItems.length;
      setCurrentIndex(incrementerRef.current);
      scheduleNext();
    }, 10000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const getItemPosition = (index: number) => {
    // Calculate the relative position in a circular manner
    const diff = (index - currentIndex + carouselItems.length) % carouselItems.length;
    
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === carouselItems.length - 1) return 'left'; // This ensures proper left positioning
    
    return 'hidden';
  };

  return (
    <div className="video-carousel">
      <div className="carousel-container">
        {carouselItems.map((item, index) => {
          const position = getItemPosition(index);
          
          return (
            <div
              key={item.id}
              className={`carousel-item carousel-item--${position}`}
            >
              {item.type === 'video' ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-wrapper"
                >
                  <video
                    ref={el => { videoRefs.current[index] = el; }}
                    className="carousel-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </a>
              ) : (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="placeholder-wrapper"
                >
                  <div className="placeholder-content">
                    <span className="placeholder-icon">{item.icon}</span>
                    <span className="placeholder-text">{item.title}</span>
                  </div>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCarousel;
