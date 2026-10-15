'use client';
import { useEffect } from 'react';
import { addArchSparkles, addButtonMagic, addPhotoSparkles } from '@/lib/sparkles';

/** Injects shine + sparkles after hydration (same order as the original script: buttons, photos, arch). */
export default function PageMagic({ photos = false }: { photos?: boolean }) {
  useEffect(() => {
    const undo = [addButtonMagic()];
    if (photos) undo.push(addPhotoSparkles(), addArchSparkles());
    return () => undo.reverse().forEach((u) => u());
  }, [photos]);
  return null;
}
