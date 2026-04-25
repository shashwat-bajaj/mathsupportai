'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

function detectSafari() {
  if (typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent;
  const isSafariEngine = /Safari/i.test(ua);
  const isChromeLike =
    /Chrome|CriOS|Edg|OPR|SamsungBrowser|Android/i.test(ua);

  return isSafariEngine && !isChromeLike;
}

export default function SiteBackdrop() {
  const reduceMotion = useReducedMotion();
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(detectSafari());
  }, []);

  const useStaticBackdrop = reduceMotion || isSafari;

  return (
    <div
      className={`siteBackdrop${isSafari ? ' isSafari' : ''}`}
      aria-hidden="true"
    >
      <div className="siteBackdropBase" />

      {useStaticBackdrop ? (
        <>
          <div className="siteBackdropOrb siteBackdropOrbOne" />
          <div className="siteBackdropOrb siteBackdropOrbTwo" />
          <div className="siteBackdropOrb siteBackdropOrbThree" />
        </>
      ) : (
        <>
          <motion.div
            className="siteBackdropOrb siteBackdropOrbOne"
            animate={{ x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="siteBackdropOrb siteBackdropOrbTwo"
            animate={{ x: [0, -34, 0], y: [0, 22, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="siteBackdropOrb siteBackdropOrbThree"
            animate={{ x: [0, 14, 0], y: [0, 26, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="siteBackdropMesh" />
      <div className="siteBackdropGlow" />
      <div className="siteBackdropVignette" />
    </div>
  );
}