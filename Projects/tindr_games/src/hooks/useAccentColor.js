import { useEffect, useState } from 'react';
import { extractAccentColor } from '../utils/extractAccentColor';

const FALLBACK = {
  accent: '#d9a441',
  accentSoft: 'rgba(217, 164, 65, 0.32)',
};

/**
 * Returns { accent, accentSoft } derived from the given image, updating
 * whenever the image changes. Starts from the fallback gold so the UI
 * never renders without a color while extraction is in flight.
 */
export function useAccentColor(imageUrl) {
  const [colors, setColors] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    if (!imageUrl) {
      setColors(FALLBACK);
      return undefined;
    }

    extractAccentColor(imageUrl).then((result) => {
      if (!cancelled) setColors(result);
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return colors;
}
