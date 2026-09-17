import React from 'react';
import './SwipeControls.css';

export default function SwipeControls({ onPass, onWishlist }) {
  return (
    <div className="swipe-controls-wrapper">
      <div className="swipe-controls">
      <button 
        className="control-btn pass-btn" 
        onClick={onPass}
        aria-label="Pass"
      >
        <span className="control-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </span>
        <span className="control-label">Pass</span>
      </button>

      <button 
        className="control-btn wishlist-btn" 
        onClick={onWishlist}
        aria-label="Wishlist"
      >
        <span className="control-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </span>
        <span className="control-label">Wishlist</span>
      </button>

      </div>
      <div className="swipe-hint" style={{ textAlign: 'center', marginTop: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'var(--font-ui)', fontWeight: 500 }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        Swipe up for more details
      </div>
    </div>
  );
}
