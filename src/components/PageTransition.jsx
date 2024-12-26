import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';

const PageTransition = ({ isActive, onTransitionMiddle, onTransitionEnd }) => {
  const [tiles, setTiles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const timeoutRefs = useRef({});

  const clearTimeouts = () => {
    Object.values(timeoutRefs.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    timeoutRefs.current = {};
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  useEffect(() => {
    if (!isActive) {
      clearTimeouts();
      setIsVisible(false);
      setIsBlurred(false);
      setTiles([]);
      return;
    }

    clearTimeouts();
    setIsVisible(true);

    const newTiles = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      row: Math.floor(i / 6),
      col: i % 6,
      delay: Math.random() * 0.3
    }));
    setTiles(newTiles);

    // Bulanıklaştırma başlangıcı
    timeoutRefs.current.blurStart = setTimeout(() => {
      setIsBlurred(true);
    }, 400);

    // Dil değişimi
    timeoutRefs.current.middle = setTimeout(() => {
      onTransitionMiddle?.();
    }, 600);

    // Bulanıklık kaldırma
    timeoutRefs.current.blurEnd = setTimeout(() => {
      setIsBlurred(false);
    }, 800);

    // Animasyon sonu
    timeoutRefs.current.end = setTimeout(() => {
      setIsVisible(false);
      timeoutRefs.current.final = setTimeout(() => {
        onTransitionEnd?.();
      }, 300);
    }, 1200);

  }, [isActive]);

  if (!isActive && !isVisible) return null;

  return (
    <>
      {/* Tam ekran bulanıklık katmanı */}
      <div 
        className={`fixed inset-0 z-[60] pointer-events-none transition-opacity duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl
          ${isBlurred ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Puzzle parçaları */}
      <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full h-full">
          {tiles.map(({ id, row, col, delay }) => (
            <div
              key={id}
              className="absolute bg-violet-500/20 dark:bg-violet-800/20 backdrop-blur-lg"
              style={{
                top: `${(row / 6) * 100}%`,
                left: `${(col / 6) * 100}%`,
                width: `${100 / 6}%`,
                height: `${100 / 6}%`,
                animation: `tileAnimation 1.2s ${delay}s both cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

PageTransition.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onTransitionMiddle: PropTypes.func,
  onTransitionEnd: PropTypes.func,
};

export default PageTransition; 