import { useEffect, useRef, useState } from 'react';

const getCursorMode = (target) => {
  if (!(target instanceof Element)) {
    return 'default';
  }

  const interactiveElement = target.closest(
    'a, button, [role="button"], summary, select, input[type="button"], input[type="submit"], input[type="reset"]'
  );
  if (interactiveElement) {
    return 'action';
  }

  const textLikeElement = target.closest(
    'input:not([type="button"]):not([type="submit"]):not([type="reset"]), textarea, [contenteditable="true"], p, span, li, h1, h2, h3, h4, h5, h6, code, pre, blockquote'
  );

  if (textLikeElement) {
    const textStyle = window.getComputedStyle(textLikeElement);
    if (textStyle.userSelect !== 'none') {
      return 'text';
    }
  }

  const style = window.getComputedStyle(target);
  if (style.cursor === 'text') {
    return 'text';
  }

  return 'default';
};

function NeoCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const frameRef = useRef(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const lastTimestampRef = useRef(0);
  const visibleRef = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState('default');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateEnabled = () => {
      setEnabled(mediaQuery.matches);
    };

    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
    } else {
      mediaQuery.addListener(updateEnabled);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateEnabled);
      } else {
        mediaQuery.removeListener(updateEnabled);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('custom-cursor-enabled');
      return undefined;
    }

    document.body.classList.add('custom-cursor-enabled');

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05);
      lastTimestampRef.current = timestamp;

      // Exponential smoothing keeps cursor feel consistent across 60/120/144/240Hz.
      const alpha = 1 - Math.exp(-20 * dt);
      pointerCurrentRef.current.x += (pointerTargetRef.current.x - pointerCurrentRef.current.x) * alpha;
      pointerCurrentRef.current.y += (pointerTargetRef.current.y - pointerCurrentRef.current.y) * alpha;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pointerCurrentRef.current.x}px, ${pointerCurrentRef.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerCurrentRef.current.x}px, ${pointerCurrentRef.current.y}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      pointerTargetRef.current = { x: event.clientX, y: event.clientY };

      if (!visibleRef.current) {
        pointerCurrentRef.current = { x: event.clientX, y: event.clientY };
        visibleRef.current = true;
        setVisible(true);
      }

      setMode(getCursorMode(event.target));
    };

    const handlePointerDown = () => {
      setPressed(true);
    };

    const handlePointerUp = () => {
      setPressed(false);
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setVisible(false);
      setPressed(false);
    };

    const handleEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      lastTimestampRef.current = 0;
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`neo-cursor ${visible ? 'neo-cursor--visible' : ''} ${pressed ? 'neo-cursor--pressed' : ''} neo-cursor--${mode}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`neo-cursor-dot ${visible ? 'neo-cursor-dot--visible' : ''} ${pressed ? 'neo-cursor-dot--pressed' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}

export default NeoCursor;
