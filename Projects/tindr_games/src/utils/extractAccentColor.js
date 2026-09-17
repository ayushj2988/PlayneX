/**
 * Samples an image and returns a saturated, mid-tone color from it —
 * used to tint each game's card and background with a color pulled
 * from its own artwork (Cyberpunk → yellow, Elden Ring → gold, etc.)
 * instead of a single fixed accent for every game.
 *
 * Note: this requires the image host to allow canvas reads
 * (crossOrigin + CORS headers). If the host doesn't, or the image
 * fails to load, this resolves to the fallback gold instead of
 * throwing — the UI should never depend on this succeeding.
 */

const FALLBACK = {
  accent: '#d9a441',
  accentSoft: 'rgba(217, 164, 65, 0.32)',
};

export function extractAccentColor(imageUrl) {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(FALLBACK);
      return;
    }

    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      try {
        const sampleSize = 32;
        const canvas = document.createElement('canvas');
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, sampleSize, sampleSize);
        const { data } = context.getImageData(0, 0, sampleSize, sampleSize);

        // Bucket similar colors together so a handful of dominant
        // pixels don't get split across many near-identical keys.
        const buckets = new Map();

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const alpha = data[i + 3];
          if (alpha < 200) continue;

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const lightness = (max + min) / 2 / 255;
          const saturation =
            max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));

          // Skip shadow, highlight, and washed-out pixels — we want
          // the color that reads as "this game", not its lighting.
          if (lightness < 0.12 || lightness > 0.88 || saturation < 0.18) {
            continue;
          }

          const key = `${Math.round(r / 24)}-${Math.round(g / 24)}-${Math.round(b / 24)}`;
          const bucket = buckets.get(key) || { r: 0, g: 0, b: 0, count: 0 };
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
          bucket.count += 1;
          buckets.set(key, bucket);
        }

        let winner = null;
        for (const bucket of buckets.values()) {
          if (!winner || bucket.count > winner.count) winner = bucket;
        }

        if (!winner) {
          resolve(FALLBACK);
          return;
        }

        const r = Math.round(winner.r / winner.count);
        const g = Math.round(winner.g / winner.count);
        const b = Math.round(winner.b / winner.count);

        resolve({
          accent: `rgb(${r}, ${g}, ${b})`,
          accentSoft: `rgba(${r}, ${g}, ${b}, 0.32)`,
        });
      } catch (error) {
        // Canvas throws on cross-origin images served without CORS.
        resolve(FALLBACK);
      }
    };

    image.onerror = () => resolve(FALLBACK);
    image.src = imageUrl;
  });
}
