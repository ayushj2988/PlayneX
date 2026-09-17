# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React, Vite, plain JavaScript, and CSS (no external styling libraries unless necessary, avoiding Tailwind per general preference unless requested).

## Users

Gamers looking for high-quality game recommendations who are tired of overwhelming store grids and generic lists.

## Product Purpose

A cinematic, swipe-based game discovery application ("PlayneX"). It answers the question "What game should I play?" by presenting one beautiful game at a time in an immersive environment. The goal is to make the user feel the game's atmosphere before making a decision.

## Positioning

A premium, highly focused game discovery experience that feels like stepping into the game's world, rather than browsing a spreadsheet or a dating app. The interface is the differentiator—it prioritizes *Discover → Feel → Decide* over *Search → Filter → Compare*.

## Operating Context

Desktop and mobile web browsers. Users will interact primarily via swipe gestures (mouse drag or touch drag) and discrete button clicks. The application operates entirely on the frontend using mock data, structured to easily swap to a real API (`GET /api/games`) in the future.

## Capabilities and Constraints

- **Frontend Only:** No backend, authentication, Steam API integration, or real recommendation algorithms in this phase.
- **State:** React state and `localStorage` only (no Redux).
- **Interactions:** Tinder-style card swiping (Pass, Wishlist, Details), but understated and elegant.
- **Responsive:** Must adapt layout naturally across mobile, tablet, and desktop.
- **Accessibility:** Must include semantic HTML, alt text, keyboard navigation, and proper contrast.

## Brand Commitments

- **Visuals:** Cinematic, dark, premium, minimal. Uses the current game's artwork for a heavily blurred, tinted background environment.
- **Typography:** Strong modern type hierarchy; 1 display font and 1 UI font.
- **Anti-patterns:** No generic SaaS aesthetics, excessive glassmorphism, neon glows, giant red/green dating app buttons, or noisy animations. 
- **Colors:** Dark base UI with subtle accent colors derived dynamically from the current game.

## Evidence on Hand

- Mock game data structure defined (ID, name, image, background, description, price, genres, platforms, screenshots, release date, developer, publisher). Initial mock: *Counter-Strike 2*.

## Product Principles

1. **One Game at a Time:** Focus entirely on immersing the user in the current game before showing the next.
2. **Restrained Elegance:** Animations and interactions should be smooth, fast, and purposeful—expensive, not noisy.
3. **Instantly Understandable:** The user must know they are in a game discovery space within 2 seconds, and understand the controls within 5 seconds.
4. **Data Ready:** Architecture must allow seamless transition from mock data to a real backend API without a UI rewrite.
