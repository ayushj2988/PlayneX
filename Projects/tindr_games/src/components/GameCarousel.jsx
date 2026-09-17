import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GameCard from './GameCard';
import './GameCarousel.css';

export default function GameCarousel({ games, activeIndex, onIndexChange, onSwipe }) {
  const lastScrollTime = useRef(0);

  const handleWheel = (e) => {
    const now = Date.now();
    // 600ms cooldown to prevent trackpad hyperscrolling
    if (now - lastScrollTime.current < 600) return;

    // Detect horizontal or vertical scroll intent
    if (e.deltaX > 20 || e.deltaY > 20) {
      if (activeIndex < games.length - 1) {
        onIndexChange(activeIndex + 1);
        lastScrollTime.current = now;
      }
    } else if (e.deltaX < -20 || e.deltaY < -20) {
      if (activeIndex > 0) {
        onIndexChange(activeIndex - 1);
        lastScrollTime.current = now;
      }
    }
  };

  return (
    <div className="game-carousel-container" onWheel={handleWheel}>
      <AnimatePresence mode="popLayout">
        {games.map((game, index) => {
          const distance = index - activeIndex;
          
          // Only render cards that are close to the active index for performance
          if (Math.abs(distance) > 2) return null;

          const isActive = distance === 0;
          const isSide = Math.abs(distance) === 1;
          
          let animate = {
            scale: 1,
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            zIndex: 10
          };

          if (distance === -1) {
            animate = { scale: 0.85, x: '-65%', y: 0, rotate: -6, opacity: 0.7, zIndex: 5 };
          } else if (distance === 1) {
            animate = { scale: 0.85, x: '65%', y: 0, rotate: 6, opacity: 0.7, zIndex: 5 };
          } else if (distance < -1) {
            animate = { scale: 0.7, x: '-90%', y: 0, rotate: -10, opacity: 0, zIndex: 1 };
          } else if (distance > 1) {
            animate = { scale: 0.7, x: '90%', y: 0, rotate: 10, opacity: 0, zIndex: 1 };
          }

          return (
            <motion.div
              key={game.id}
              initial={false}
              animate={animate}
              transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 0.8 }}
              style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%' }}
              className={`carousel-item ${isActive ? 'active' : ''} ${isSide ? 'side' : ''}`}
              onClick={() => {
                if (!isActive && isSide) {
                  onIndexChange(index);
                }
              }}
            >
              <GameCard 
                game={game} 
                onSwipe={isActive ? onSwipe : () => {}} 
                dragEnabled={isActive}
                isActive={isActive}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
