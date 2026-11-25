(() => {
  'use strict';

  const TOTAL_FRAMES = 40;
  const FOLDER_PATH = 'Travel_animation_video_generatio_4320da43-ezgif-split';

  const canvas = document.getElementById('cinema-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });

  const images = [];
  let loadedCount = 0;

  // Animation & Physics State
  let targetProgress = 0;
  let currentProgress = 0;
  let velocity = 0;

  // Viewport Dimensions
  let viewWidth = 0;
  let viewHeight = 0;
  let dpr = 1;

  // Preload all 40 frames sequentially
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const frameNumber = String(i).padStart(3, '0');
    const img = new Image();
    img.src = `${FOLDER_PATH}/ezgif-frame-${frameNumber}.jpg`;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === 1) {
        resizeCanvas();
        renderScene(0);
      }
    };
    images.push(img);
  }

  // Handle responsive canvas sizing with DPR scaling
  function resizeCanvas() {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(viewWidth * dpr);
    canvas.height = Math.round(viewHeight * dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('orientationchange', resizeCanvas, { passive: true });
  resizeCanvas();

  // --- UNIVERSAL SCROLL & GESTURE INPUT ENGINE ---

  // 1. Mouse Wheel & Trackpad Gesture
  window.addEventListener('wheel', (e) => {
    let delta = e.deltaY;
    if (e.deltaMode === 1) { // Line delta
      delta *= 33.3;
    } else if (e.deltaMode === 2) { // Page delta
      delta *= 500;
    }
    // Smooth calibrated scroll progress
    targetProgress = Math.min(Math.max(targetProgress + delta * 0.00045, 0), 1);
  }, { passive: true });

  // 2. Mobile Touch Swipe & Gesture
  let touchStartY = 0;
  let touchStartProgress = 0;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
      touchStartProgress = targetProgress;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const deltaY = touchStartY - e.touches[0].clientY;
      const sensitivity = 0.65 / Math.max(window.innerHeight, 400);
      targetProgress = Math.min(Math.max(touchStartProgress + deltaY * sensitivity, 0), 1);
    }
  }, { passive: true });

  // 3. Desktop Click & Drag Scrubbing
  let isDragging = false;
  let dragStartY = 0;
  let dragStartProgress = 0;

  window.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isDragging = true;
      dragStartY = e.clientY;
      dragStartProgress = targetProgress;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaY = dragStartY - e.clientY;
      const sensitivity = 0.65 / Math.max(window.innerHeight, 400);
      targetProgress = Math.min(Math.max(dragStartProgress + deltaY * sensitivity, 0), 1);
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // 4. Keyboard Navigation (Arrow Keys, Spacebar, Page Up/Down)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault();
      targetProgress = Math.min(targetProgress + 0.04, 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      targetProgress = Math.max(targetProgress - 0.04, 0);
    } else if (e.key === 'Home') {
      e.preventDefault();
      targetProgress = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      targetProgress = 1;
    }
  });

  // Smoothstep easing for cinematic dissolve
  function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  // Draw scene with camera motion, zoom & parallax
  function renderScene(progress) {
    if (images.length === 0) return;

    const frameFloat = progress * (TOTAL_FRAMES - 1);
    const indexA = Math.floor(frameFloat);
    const indexB = Math.min(indexA + 1, TOTAL_FRAMES - 1);
    const subProgress = frameFloat - indexA;

    const imgA = images[indexA];
    const imgB = images[indexB];

    if (!imgA || !imgA.complete || imgA.naturalWidth === 0) return;

    // Cinematic camera calculations
    // Forward dolly zoom & macro travel
    const segmentDolly = 1.0 + 0.045 * subProgress;
    const macroTravel = 1.0 + 0.035 * Math.sin(progress * Math.PI);
    const velocityZoom = 1.0 + Math.min(Math.abs(velocity) * 1.8, 0.08);
    const totalZoom = segmentDolly * macroTravel * velocityZoom;

    // Cinematic camera pan & parallax drift
    const panX = Math.sin(progress * Math.PI * 2.5) * 18 + (velocity * -90);
    const panY = Math.cos(progress * Math.PI * 2.0) * 12;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Frame A render (Cover math)
    const baseScaleA = Math.max(viewWidth / imgA.naturalWidth, viewHeight / imgA.naturalHeight);
    const scaleA = baseScaleA * totalZoom;
    const drawWidthA = imgA.naturalWidth * scaleA;
    const drawHeightA = imgA.naturalHeight * scaleA;
    const drawXA = (viewWidth - drawWidthA) / 2 + panX;
    const drawYA = (viewHeight - drawHeightA) / 2 + panY;

    // Base Frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgA, drawXA, drawYA, drawWidthA, drawHeightA);

    // Smooth transition overlay to Frame B
    if (indexA !== indexB && imgB && imgB.complete && imgB.naturalWidth > 0) {
      const blend = smoothstep(0, 1, subProgress);
      if (blend > 0.001) {
        const baseScaleB = Math.max(viewWidth / imgB.naturalWidth, viewHeight / imgB.naturalHeight);
        const scaleB = baseScaleB * (totalZoom * 0.985 + 0.015 * subProgress);
        const drawWidthB = imgB.naturalWidth * scaleB;
        const drawHeightB = imgB.naturalHeight * scaleB;
        const drawXB = (viewWidth - drawWidthB) / 2 + panX * 0.95;
        const drawYB = (viewHeight - drawHeightB) / 2 + panY * 0.95;

        ctx.globalAlpha = blend;
        ctx.drawImage(imgB, drawXB, drawYB, drawWidthB, drawHeightB);
      }
    }

    // Cinematic anamorphic vignette overlay
    const gradient = ctx.createRadialGradient(
      viewWidth / 2, viewHeight / 2, Math.min(viewWidth, viewHeight) * 0.45,
      viewWidth / 2, viewHeight / 2, Math.max(viewWidth, viewHeight) * 0.85
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.55)');

    ctx.globalAlpha = 1.0;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, viewWidth, viewHeight);

    ctx.restore();
  }

  // Animation Loop with smooth inertia (LERP)
  function animate() {
    const diff = targetProgress - currentProgress;
    velocity = diff * 0.075;
    currentProgress += velocity;

    if (Math.abs(diff) < 0.00005) {
      currentProgress = targetProgress;
      velocity = 0;
    }

    renderScene(currentProgress);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // Prevent default drag interruption
  window.addEventListener('dragstart', (e) => e.preventDefault());
})();
