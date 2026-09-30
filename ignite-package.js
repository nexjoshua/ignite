/* =====================================================================
   iGNITE PACKAGE — 3D tilt + cursor spotlight on hover, "lit" boxes
   while scrolling on touch screens, videos only play on-screen,
   scroll-in reveal.
===================================================================== */
(function () {
  const boxes = Array.from(document.querySelectorAll('[data-ipk-tilt]'));
  const mct = document.querySelector('.mct-card');
  if (!boxes.length && !mct) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* tilt + spotlight (mouse only) */
  if (canHover && !reduce) {
    boxes.forEach((box) => {
      let raf = 0;
      box.addEventListener('pointermove', (e) => {
        const r = box.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          box.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          box.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          box.style.setProperty('--ry', ((px - 0.5) * 8).toFixed(2) + 'deg');
          box.style.setProperty('--rx', ((0.5 - py) * 6).toFixed(2) + 'deg');
        });
      });
      box.addEventListener('pointerleave', () => {
        box.style.setProperty('--rx', '0deg');
        box.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* touch screens: light up the box in the middle of the screen */
  if (!canHover && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.target.classList.toggle('is-hot', en.isIntersecting));
    }, { rootMargin: '-38% 0px -38% 0px' });
    boxes.forEach((b) => io.observe(b));
  }

  /* only play videos while they're visible */
  const vids = document.querySelectorAll('.ipk-section video');
  if ('IntersectionObserver' in window && vids.length) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) { v.muted = true; v.play().catch(() => {}); }
        else v.pause();
      });
    }, { threshold: 0.15 });
    vids.forEach((v) => vio.observe(v));
  }

  /* scroll reveal (clearProps so the CSS hover transforms keep working) */
  if (window.gsap && window.ScrollTrigger && !reduce) {
    const head = document.querySelector('.ipk-head');
    if (head) gsap.from(head.children, {
      opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: head, start: 'top 85%' },
    });
    if (boxes.length) gsap.from(boxes, {
      opacity: 0, y: 50, scale: 0.97, duration: 0.8, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '.ipk-grid', start: 'top 85%' },
    });
    const bar = document.querySelector('.ipk-bar');
    if (bar) gsap.from(bar, {
      opacity: 0, y: 30, duration: 0.8, ease: 'power2.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: bar, start: 'top 90%' },
    });
    if (mct) gsap.from(mct, {
      opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: mct, start: 'top 88%' },
    });
  }
})();