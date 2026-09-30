/* =====================================================================
   IGNITE ADDITIONS — pricing "What's inside" popups.
   Works automatically on any page that has .aw-plan-card elements
   (homepage + services page). Edit the paths below to add your real
   images/videos; empty or missing files keep the placeholder showing.

   fit: 'contain' → shows the whole image (use for designed graphics
   that shouldn't be cropped). Leave it off for real screenshots.
===================================================================== */
(function initPlanPeek() {
  const cards = document.querySelectorAll('.aw-plan-card');
  if (!cards.length) return;

  const AUDIT_URL = './contact.html';
  const BOOK_CALL_URL = './contact.html'; // swap for your Calendly / GHL booking link

  const PLANS = {
    foundation: {
      title: 'Foundation', price: '£500 / month',
      intro: 'A fast, credible website with booking built in — the base every trade needs to look the part online.',
      items: [
        { device: 'mac', title: 'Responsive Website', desc: 'A fast, mobile-first website built from a niche-tested snapshot, with your reviews and services front and centre.', img: './images/plan-website.jpg', video: 'https://assets.cdn.filesafe.space/hNOfqrviXSOAm48tJDLo/media/6ab218d3bdaa5e26a985c4d4.mp4' },
        { device: 'phone', title: 'Built-In Booking System', desc: 'Customers book straight onto your real calendar, with no back-and-forth.', img: './images/ai-booking-demo.png', video: '', fit: 'contain' },
      ],
      creatives: [],
    },
    ignite: {
      title: 'iGNITE Package', price: '£700 / month · Most Popular',
      intro: 'The full system: your website and booking, a reviews funnel, an AI receptionist and Meta ads — built, wired together and run for you.',
      items: [
        { device: 'mac', title: 'Website With Booking System', desc: 'A premium, mobile-first website with live booking onto your calendar, built from a niche-tested snapshot.', img: './images/plan-website.jpg', video: 'https://assets.cdn.filesafe.space/hNOfqrviXSOAm48tJDLo/media/6ab218d3bdaa5e26a985c4d4.mp4' },
        { device: 'phone', title: 'Magic Google Reviews Funnel', desc: 'After every job, your customer gets a one-tap link to leave a Google review, so your rating keeps climbing on its own.', img: './images/google-reviews-demo.png', video: '', fit: 'contain' },
        { device: 'phone', title: 'Chatbot / Voice AI', desc: 'An AI receptionist that answers, qualifies the enquiry and books the job — on chat or over the phone, 24/7.', img: './images/ai-booking-demo.png', video: '', fit: 'contain' },
      ],
      creatives: ['./assets/special-offer.jpeg', './assets/design-highlights.jpeg', './assets/smart-stove-hook.jpeg'],
      creativesTitle: 'Meta Ads Management',
      creativesDesc: 'Scroll-stopping ad creatives built around your jobs, brand and area, with campaigns managed end-to-end.',
    },
    ads: {
      title: 'Ads Management', price: '£500 / month · Standalone',
      intro: 'For trades that already have a website and booking system and just need paid traffic done properly.',
      items: [],
      creatives: ['./assets/smart-stove-hook.jpeg', './assets/brand-catalog-cover.jpeg', './assets/design-highlights.jpeg'],
      creativesTitle: 'Sample Ad Creative',
      creativesDesc: 'Funnel, creatives and Meta campaign management. Here is the kind of ad we put in front of homeowners in your patch.',
    },
  };

  const cur = document.getElementById('cursor');

  function media(src, video, label, alt) {
    let h = `<div class="dev-ph"><b>${label}</b><small>${video || src || ''}</small></div>`;
    if (video) h += `<video src="${video}" autoplay muted loop playsinline onerror="this.remove()"></video>`;
    else if (src) h += `<img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()">`;
    return h;
  }

  function device(item) {
    const inner = media(item.img, item.video, item.title, item.title);
    const fit = item.fit === 'contain' ? ' is-contain' : '';
    if (item.device === 'mac') {
      return `<div class="dev-mac is-solo"><div class="dev-mac-lid"><span class="dev-mac-notch"></span>
        <div class="dev-screen dev-mac-screen${fit}">${inner}</div></div><div class="dev-mac-base"></div></div>`;
    }
    return `<div class="dev-phone is-solo"><span class="dev-phone-island"></span>
      <div class="dev-screen dev-phone-screen${fit}">${inner}</div></div>`;
  }

  const overlay = document.createElement('div');
  overlay.className = 'plan-modal-overlay';
  overlay.setAttribute('data-lenis-prevent', '');
  overlay.innerHTML = `<div class="plan-modal" role="dialog" aria-modal="true">
      <button class="plan-modal-close" type="button" aria-label="Close">&#10005;</button>
      <div class="plan-modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);
  const body = overlay.querySelector('.plan-modal-body');

  function render(plan) {
    let html = `<div class="plan-modal-head">
        <span class="eyebrow-label">What's Inside</span>
        <h3>${plan.title}</h3>
        <div class="plan-modal-price">${plan.price}</div>
        <p>${plan.intro}</p>
      </div>`;

    if (plan.items.length) {
      // an odd phone out goes full-width (side by side) instead of leaving an empty gap
      const phones = plan.items.filter((it) => it.device !== 'mac');
      const lonePhone = phones.length % 2 === 1 ? phones[phones.length - 1] : null;

      html += '<div class="plan-items">';
      plan.items.forEach((item, i) => {
        let cls = 'plan-item';
        if (item.device === 'mac') cls += ' is-wide';
        else if (item === lonePhone) cls += ' is-wide is-flip is-phone-wide';
        html += `<div class="${cls}">
            <div class="plan-item-visual">${device(item)}</div>
            <div><span class="plan-item-num">Included ${String(i + 1).padStart(2, '0')}</span>
            <h4>${item.title}</h4><p>${item.desc}</p></div>
          </div>`;
      });
      html += '</div>';
    }

    if (plan.creatives.length) {
      html += `<div class="plan-creatives${plan.creatives.length === 1 ? ' is-single' : ''}">
          <h4>${plan.creativesTitle}</h4><p>${plan.creativesDesc}</p><div class="plan-creatives-grid">`;
      plan.creatives.forEach((src, i) => {
        html += `<div class="plan-creative">${media(src, '', 'Ad Creative ' + (i + 1), plan.title + ' ad creative ' + (i + 1))}</div>`;
      });
      html += '</div></div>';
    }

    html += `<div class="plan-modal-ctas">
        <a href="${AUDIT_URL}" class="btn btn-light">Get My Free Audit</a>
        <a href="${BOOK_CALL_URL}" class="btn btn-outline">Book My Call</a>
      </div>`;
    body.innerHTML = html;

    body.querySelectorAll('.btn').forEach((el) => {
      el.addEventListener('mouseenter', () => cur && cur.classList.add('is-click'));
      el.addEventListener('mouseleave', () => cur && cur.classList.remove('is-click'));
    });
  }

  function open(key) {
    const plan = PLANS[key];
    if (!plan) return;
    render(plan);
    overlay.scrollTop = 0;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined') lenis.stop();
  }

  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined') lenis.start();
    body.querySelectorAll('video').forEach((v) => v.pause());
  }

  overlay.querySelector('.plan-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

  function keyFor(card) {
    const t = ((card.querySelector('h4') || {}).textContent || '').toLowerCase();
    if (t.includes('foundation')) return 'foundation';
    if (t.includes('ignite') || t.includes('growth')) return 'ignite';
    if (t.includes('ads')) return 'ads';
    return null;
  }

  cards.forEach((card) => {
    const key = keyFor(card);
    if (!key) return;
    card.classList.add('is-peekable');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'plan-peek-btn';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>See What's Inside`;
    const list = card.querySelector('.aw-plan-list');
    if (list) list.insertAdjacentElement('afterend', btn);

    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      open(key);
    });
  });
})();
