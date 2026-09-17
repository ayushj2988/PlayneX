import './SceneBackground.css';

/**
 * The immersive, blurred, tinted environment behind the Discover UI.
 * Purely decorative — marked aria-hidden — and never the focal point.
 */
export default function SceneBackground({ image, accent }) {
  return (
    <div
      className="scene"
      style={accent ? { '--accent': accent } : undefined}
      aria-hidden="true"
    >
      <div className="scene__image" style={{ backgroundImage: `url(${image})` }} />
      <div className="scene__tint" />
      <div className="scene__scrim" />
    </div>
  );
}
