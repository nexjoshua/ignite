/* =====================================================================
   TERRITORY CHECKER — moved out of index.html. Desktop: map + filterable
   grid. Mobile (<=760px): search only, results appear as you type.
   Supports ?q=BS in the URL (homepage teaser search sends people here).
===================================================================== */
(function () {
  const AREAS = [
    {code:'AB',name:'Aberdeen',pop:500309,districts:33},{code:'AL',name:'St Albans',pop:250427,districts:10},
    {code:'B',name:'Birmingham',pop:1904658,districts:76},{code:'BA',name:'Bath',pop:434166,districts:19},
    {code:'BB',name:'Blackburn',pop:488917,districts:13},{code:'BD',name:'Bradford',pop:578336,districts:24},
    {code:'BH',name:'Bournemouth',pop:551987,districts:26},{code:'BL',name:'Bolton',pop:380259,districts:10},
    {code:'BN',name:'Brighton',pop:802831,districts:30},{code:'BR',name:'Bromley',pop:299293,districts:8},
    {code:'BS',name:'Bristol',pop:940241,districts:37},{code:'BT',name:'Belfast',pop:1876695,districts:80},
    {code:'CA',name:'Carlisle',pop:318244,districts:28},{code:'CB',name:'Cambridge',pop:421467,districts:16},
    {code:'CF',name:'Cardiff',pop:1005334,districts:35},{code:'CH',name:'Chester',pop:659743,districts:24},
    {code:'CM',name:'Chelmsford',pop:653492,districts:25},{code:'CO',name:'Colchester',pop:411418,districts:16},
    {code:'CR',name:'Croydon',pop:405982,districts:8},{code:'CT',name:'Canterbury',pop:482504,districts:21},
    {code:'CV',name:'Coventry',pop:821807,districts:24},{code:'CW',name:'Crewe',pop:309489,districts:12},
    {code:'DA',name:'Dartford',pop:430560,districts:18},{code:'DD',name:'Dundee',pop:280291,districts:11},
    {code:'DE',name:'Derby',pop:730620,districts:22},{code:'DG',name:'Dumfries',pop:151174,districts:16},
    {code:'DH',name:'Durham',pop:309211,districts:9},{code:'DL',name:'Darlington',pop:360975,districts:17},
    {code:'DN',name:'Doncaster',pop:755713,districts:28},{code:'DT',name:'Dorchester',pop:213203,districts:11},
    {code:'DY',name:'Dudley',pop:410598,districts:14},{code:'E',name:'East London',pop:990035,districts:19},
    {code:'EC',name:'East Central London',pop:33205,districts:23},{code:'EH',name:'Edinburgh',pop:868938,districts:37},
    {code:'EN',name:'Enfield',pop:344434,districts:11},{code:'EX',name:'Exeter',pop:547511,districts:29},
    {code:'FK',name:'Falkirk',pop:276600,districts:21},{code:'FY',name:'Blackpool',pop:276623,districts:8},
    {code:'G',name:'Glasgow',pop:1184619,districts:34},{code:'GL',name:'Gloucester',pop:605821,districts:22},
    {code:'GU',name:'Guildford',pop:725368,districts:36},{code:'HA',name:'Harrow',pop:480953,districts:10},
    {code:'HD',name:'Huddersfield',pop:262814,districts:9},{code:'HG',name:'Harrogate',pop:138343,districts:5},
    {code:'HP',name:'Hemel Hempstead',pop:488351,districts:23},{code:'HR',name:'Hereford',pop:176493,districts:9},
    {code:'HS',name:'Outer Hebrides',pop:27684,districts:9},{code:'HU',name:'Hull',pop:443223,districts:20},
    {code:'HX',name:'Halifax',pop:160378,districts:7},{code:'IG',name:'Ilford',pop:335694,districts:11},
    {code:'IP',name:'Ipswich',pop:595934,districts:33},{code:'IV',name:'Inverness',pop:228244,districts:47},
    {code:'KA',name:'Kilmarnock',pop:371478,districts:30},{code:'KT',name:'Kingston upon Thames',pop:531664,districts:24},
    {code:'KW',name:'Kirkwall',pop:53203,districts:17},{code:'KY',name:'Kirkcaldy',pop:364238,districts:16},
    {code:'L',name:'Liverpool',pop:857079,districts:40},{code:'LA',name:'Lancaster',pop:328704,districts:23},
    {code:'LD',name:'Llandrindod Wells',pop:49792,districts:8},{code:'LE',name:'Leicester',pop:985795,districts:19},
    {code:'LL',name:'Llandudno',pop:537467,districts:68},{code:'LN',name:'Lincoln',pop:293310,districts:13},
    {code:'LS',name:'Leeds',pop:774180,districts:29},{code:'LU',name:'Luton',pop:335950,districts:7},
    {code:'M',name:'Manchester',pop:1167402,districts:37},{code:'ME',name:'Medway',pop:607143,districts:20},
    {code:'MK',name:'Milton Keynes',pop:507978,districts:27},{code:'ML',name:'Motherwell',pop:383317,districts:12},
    {code:'N',name:'North London',pop:848197,districts:22},{code:'NE',name:'Newcastle upon Tyne',pop:1162698,districts:41},
    {code:'NG',name:'Nottingham',pop:1163185,districts:24},{code:'NN',name:'Northampton',pop:653215,districts:18},
    {code:'NP',name:'Newport',pop:488368,districts:17},{code:'NR',name:'Norwich',pop:722087,districts:35},
    {code:'NW',name:'North West London',pop:551407,districts:11},{code:'OL',name:'Oldham',pop:462833,districts:16},
    {code:'OX',name:'Oxford',pop:612827,districts:26},{code:'PA',name:'Paisley',pop:321691,districts:56},
    {code:'PE',name:'Peterborough',pop:890223,districts:30},{code:'PH',name:'Perth',pop:165367,districts:41},
    {code:'PL',name:'Plymouth',pop:542719,districts:35},{code:'PO',name:'Portsmouth',pop:822331,districts:31},
    {code:'PR',name:'Preston',pop:520556,districts:11},{code:'RG',name:'Reading',pop:778677,districts:28},
    {code:'RH',name:'Redhill',pop:532536,districts:20},{code:'RM',name:'Romford',pop:516824,districts:20},
    {code:'S',name:'Sheffield',pop:1358507,districts:41},{code:'SA',name:'Swansea',pop:730232,districts:53},
    {code:'SE',name:'South East London',pop:988702,districts:28},{code:'SG',name:'Stevenage',pop:402911,districts:13},
    {code:'SK',name:'Stockport',pop:603795,districts:19},{code:'SL',name:'Slough',pop:373607,districts:9},
    {code:'SM',name:'Sutton',pop:217048,districts:7},{code:'SN',name:'Swindon',pop:459049,districts:18},
    {code:'SO',name:'Southampton',pop:665193,districts:24},{code:'SP',name:'Salisbury',pop:232524,districts:11},
    {code:'SR',name:'Sunderland',pop:250826,districts:8},{code:'SS',name:'Southend-on-Sea',pop:518677,districts:17},
    {code:'ST',name:'Stoke-on-Trent',pop:644068,districts:21},{code:'SW',name:'South West London',pop:874844,districts:26},
    {code:'SY',name:'Shrewsbury',pop:342140,districts:25},{code:'TA',name:'Taunton',pop:322197,districts:24},
    {code:'TD',name:'Tweeddale',pop:94483,districts:15},{code:'TF',name:'Telford',pop:212061,districts:13},
    {code:'TN',name:'Tunbridge Wells',pop:680816,districts:40},{code:'TQ',name:'Torquay',pop:281404,districts:14},
    {code:'TR',name:'Truro',pop:293864,districts:27},{code:'TS',name:'Cleveland',pop:602474,districts:29},
    {code:'TW',name:'Twickenham',pop:490472,districts:20},{code:'UB',name:'Southall',pop:371969,districts:12},
    {code:'W',name:'West London',pop:533706,districts:14},{code:'WA',name:'Warrington',pop:616180,districts:16},
    {code:'WC',name:'West Central London',pop:35995,districts:14},{code:'WD',name:'Watford',pop:255988,districts:11},
    {code:'WF',name:'Wakefield',pop:512657,districts:17},{code:'WN',name:'Wigan',pop:308483,districts:8},
    {code:'WR',name:'Worcester',pop:287414,districts:15},{code:'WS',name:'Walsall',pop:449687,districts:15},
    {code:'WV',name:'Wolverhampton',pop:395857,districts:16},{code:'YO',name:'York',pop:562439,districts:30},
    {code:'ZE',name:'Zetland (Shetland)',pop:23167,districts:3}
  ];
  AREAS.forEach((a) => { a.homes = Math.round(a.pop / 2.4 / 100) * 100; a.leads = Math.round(a.homes * 0.03); });

  const REGION_POS = {"ZE":[366,22],"KW":[304,28],"HS":[203,70],"IV":[283,88],"AB":[340,85],"PH":[260,140],"DD":[310,160],"FK":[244,174],"EH":[283,200],"G":[220,204],"ML":[248,220],"KY":[305,184],"KA":[200,230],"DG":[226,252],"TD":[278,234],"PA":[185,206],"CA":[234,282],"NE":[300,270],"SR":[308,290],"DH":[285,292],"LA":[244,306],"YO":[298,324],"LS":[264,341],"BD":[244,334],"HX":[245,352],"HD":[263,362],"S":[283,376],"HU":[330,344],"DN":[306,366],"M":[228,363],"L":[208,361],"PR":[220,328],"BB":[238,344],"WN":[212,375],"OL":[246,378],"SK":[246,393],"CH":[198,387],"NG":[300,394],"DE":[272,408],"ST":[248,409],"B":[262,430],"LE":[294,422],"CV":[284,442],"WV":[234,428],"SA":[183,445],"CF":[208,450],"NP":[228,452],"BS":[229,470],"GL":[254,466],"OX":[284,470],"SO":[280,510],"EX":[187,499],"PL":[163,519],"TR":[133,532],"NW":[301,491],"N":[318,489],"E":[330,498],"SW":[296,510],"SE":[322,511],"RG":[304,484],"BN":[318,540],"ME":[364,517],"CT":[385,514],"CB":[338,454],"IP":[370,451],"NR":[371,422]};

  const MOBILE = window.matchMedia('(max-width: 760px)');
  const MOBILE_LIMIT = 8;

  let taken = new Map();
  let filter = 'all';
  let search = '';
  let current = null;

  const $ = (id) => document.getElementById(id);
  const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'm' : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const sk = (code) => 'ignite:territory:' + code;

  function loadTaken() {
    taken = new Map();
    try {
      AREAS.forEach((a) => {
        const raw = localStorage.getItem(sk(a.code));
        if (raw) { try { taken.set(a.code, JSON.parse(raw)); } catch (e) {} }
      });
    } catch (e) {}
  }

  function lockScroll(on) {
    document.body.classList.toggle('tc2-lock', on);
    if (typeof lenis !== 'undefined') on ? lenis.stop() : lenis.start();
  }

  /* ---------- matching: exact code > code prefix > town name ---------- */
  function matches(q) {
    if (!q) return AREAS.slice();
    const ql = q.toLowerCase().replace(/\s+/g, '');
    const qt = q.toLowerCase().trim();
    const scored = [];
    AREAS.forEach((a) => {
      const c = a.code.toLowerCase();
      let s = -1;
      if (c === ql) s = 0;
      else if (c.startsWith(ql) || ql.startsWith(c) && /\d/.test(ql)) s = 1; // "BS1" still finds BS
      else if (a.name.toLowerCase().startsWith(qt)) s = 2;
      else if (a.name.toLowerCase().includes(qt)) s = 3;
      if (s > -1) scored.push({ a, s });
    });
    return scored.sort((x, y) => x.s - y.s).map((x) => x.a);
  }

  function renderGrid() {
    const gridEl = $('tc2Grid');
    if (!gridEl) return;
    const countEl = $('tc2Count');
    const hintEl = $('tc2Hint');
    const q = search.trim();
    const mobile = MOBILE.matches;

    if (mobile && !q) {
      gridEl.innerHTML = '';
      countEl.textContent = '';
      hintEl && hintEl.classList.add('is-shown');
      return;
    }
    hintEl && hintEl.classList.remove('is-shown');

    let list = matches(q);
    if (!mobile) {
      list = list.filter((a) => {
        const isTaken = taken.has(a.code);
        return filter === 'all' || (filter === 'taken' && isTaken) || (filter === 'available' && !isTaken);
      });
    }
    const shown = mobile ? list.slice(0, MOBILE_LIMIT) : list;

    countEl.textContent = mobile
      ? (list.length ? list.length + ' matching area' + (list.length > 1 ? 's' : '') : '')
      : list.length + ' of ' + AREAS.length + ' areas shown';

    if (!shown.length) {
      gridEl.innerHTML = '<div class="tc2-empty">No areas match &ldquo;' + esc(q) + '&rdquo;. Try a town name (e.g. Leeds) or the first letters of your postcode (e.g. LS).</div>';
      return;
    }
    gridEl.innerHTML = shown.map((a) => {
      const t = taken.has(a.code);
      return '<div class="tc2-card ' + (t ? 'taken' : 'available') + '" data-code="' + a.code + '" role="button" tabindex="0">'
        + '<span class="status">' + (t ? 'Taken' : 'Available') + '</span>'
        + '<div class="code">' + a.code + '</div>'
        + '<div class="name">' + a.name + '</div>'
        + '<div class="homes">' + fmt(a.homes) + ' homes</div></div>';
    }).join('');
  }

  function renderMap() {
    const svg = $('tc2Map');
    if (!svg) return;
    svg.querySelectorAll('.tc2-region').forEach((r) => {
      const code = r.getAttribute('data-code');
      r.classList.remove('taken', 'available');
      r.classList.add(taken.has(code) ? 'taken' : 'available');
    });
    svg.querySelectorAll('.tc2-ping').forEach((p) => p.remove());
    taken.forEach((info, code) => {
      const pos = REGION_POS[code]; if (!pos) return;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'tc2-ping');
      g.innerHTML = '<circle cx="' + pos[0] + '" cy="' + pos[1] + '" r="3.5" fill="var(--accent-bright)" opacity="0.9"/>'
        + '<circle cx="' + pos[0] + '" cy="' + pos[1] + '" r="3.5" fill="none" stroke="var(--accent-bright)" stroke-width="1.4" opacity="0.8">'
        + '<animate attributeName="r" values="3.5;13;3.5" dur="2.6s" repeatCount="indefinite"/>'
        + '<animate attributeName="opacity" values="0.8;0;0.8" dur="2.6s" repeatCount="indefinite"/></circle>';
      svg.appendChild(g);
    });
  }

  function renderMarquee() {
    const el = $('tc2Marquee'); if (!el) return;
    const pool = [];
    taken.forEach((info, code) => { const a = AREAS.find((x) => x.code === code); if (a) pool.push({ a, info, status: 'taken' }); });
    AREAS.filter((a) => !taken.has(a.code)).slice(0, 12).forEach((a) => pool.push({ a, status: 'available' }));
    const html = pool.slice(0, 18).map((it) => it.status === 'taken'
      ? '<div class="tc2-pill taken"><span class="ic"></span><b>' + it.a.code + '</b><span class="dim">' + it.a.name + ' claimed' + (it.info && it.info.since ? ' ' + it.info.since : '') + '</span></div>'
      : '<div class="tc2-pill available"><span class="ic"></span><b>' + it.a.code + '</b><span class="dim">' + it.a.name + ' available now</span></div>').join('');
    el.innerHTML = html + html;
  }

  function metricsHtml(a) {
    return '<div class="tc2-modal-metrics">'
      + '<div><div class="v">' + fmt(a.homes) + '</div><div class="l">Homes</div></div>'
      + '<div><div class="v">' + a.districts + '</div><div class="l">Districts</div></div>'
      + '<div><div class="v">' + fmt(a.leads) + '+</div><div class="l">Leads/yr</div></div></div>';
  }

  function openModal(code) {
    current = AREAS.find((a) => a.code === code); if (!current) return;
    const isTaken = taken.has(code);
    const body = $('tc2ModalBody');
    if (isTaken) {
      const info = taken.get(code);
      body.innerHTML = '<div class="tc2-modal-icon lock">&#128274;</div>'
        + '<h3>' + current.code + ' — ' + current.name + '</h3>'
        + '<p class="sub">This territory is currently claimed' + (info.since ? ' &middot; since ' + info.since : '') + '. Join the waitlist and we\u2019ll let you know the moment a spot opens.</p>'
        + metricsHtml(current)
        + '<form id="tc2Form"><div class="tc2-field"><label for="tc2Email">Email Address</label><input type="email" id="tc2Email" required placeholder="you@company.co.uk"></div>'
        + '<button type="submit" class="tc2-modal-submit">Join Waitlist</button></form>';
    } else {
      body.innerHTML = '<div class="tc2-modal-icon ok">&#10003;</div>'
        + '<h3>' + current.code + ' — ' + current.name + '</h3>'
        + '<p class="sub">Good news — this territory is open. Reserve it now and we\u2019ll be in touch within one business day to confirm.</p>'
        + metricsHtml(current)
        + '<form id="tc2Form"><div class="tc2-field"><label for="tc2Name">Full Name</label><input type="text" id="tc2Name" required placeholder="Your name"></div>'
        + '<div class="tc2-field"><label for="tc2Email">Email Address</label><input type="email" id="tc2Email" required placeholder="you@company.co.uk"></div>'
        + '<button type="submit" class="tc2-modal-submit">Reserve This Territory →</button></form>';
    }
    $('tc2Form').addEventListener('submit', (e) => {
      e.preventDefault();
      if (isTaken) return showSuccess(current, 'waitlist');
      const name = $('tc2Name').value.trim() || 'Reserved';
      const d = { status: 'taken', owner: name, since: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) };
      try { localStorage.setItem(sk(current.code), JSON.stringify(d)); } catch (err) {}
      taken.set(current.code, d);
      renderGrid(); renderMap(); renderMarquee();
      showSuccess(current, 'reserved');
    });
    $('tc2ModalOverlay').classList.add('open');
    lockScroll(true);
  }

  function showSuccess(a, kind) {
    const msg = kind === 'reserved'
      ? 'We\u2019ll reach out within one business day to confirm your <b>' + a.code + '</b> territory.'
      : 'We\u2019ll email you the moment <b>' + a.code + '</b> opens up.';
    $('tc2ModalBody').innerHTML = '<div class="tc2-modal-success">'
      + '<svg class="tc2-check" viewBox="0 0 52 52"><circle cx="26" cy="26" r="23"/><path d="M15 27l7 7 15-15"/></svg>'
      + '<h3>' + (kind === 'reserved' ? 'You\u2019re in!' : 'You\u2019re on the list') + '</h3>'
      + '<p class="sub">' + msg + '</p>'
      + '<a href="./contact.html" class="tc2-modal-submit" style="display:block;text-decoration:none;text-align:center">Continue to Full Application</a></div>';
  }

  function closeModal() {
    const ov = $('tc2ModalOverlay');
    if (!ov || !ov.classList.contains('open')) return;
    ov.classList.remove('open');
    lockScroll(false);
  }

  function countUp() {
    document.querySelectorAll('.tc2-stat-num[data-count]').forEach((el) => {
      const target = +el.getAttribute('data-count'); let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const t = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(t); } el.textContent = cur; }, 28);
    });
  }

  function init() {
    if (!$('tc2Grid')) return;
    loadTaken();

    // map interactions (desktop)
    const mapEl = $('tc2Map');
    const mapWrap = document.querySelector('.tc2-map-wrap');
    const tip = $('tc2Tooltip');
    if (mapEl) mapEl.querySelectorAll('.tc2-region').forEach((r) => {
      r.addEventListener('click', () => openModal(r.getAttribute('data-code')));
      if (!tip || !mapWrap) return;
      r.addEventListener('mouseenter', () => {
        const a = AREAS.find((x) => x.code === r.getAttribute('data-code'));
        if (!a) return;
        tip.textContent = a.code + ' · ' + a.name + (taken.has(a.code) ? ' (taken)' : ' (available)');
        tip.classList.add('is-visible');
      });
      r.addEventListener('mousemove', (e) => {
        const rect = mapWrap.getBoundingClientRect();
        tip.style.left = (e.clientX - rect.left) + 'px';
        tip.style.top = (e.clientY - rect.top) + 'px';
      });
      r.addEventListener('mouseleave', () => tip.classList.remove('is-visible'));
    });

    // grid clicks + keyboard
    const gridEl = $('tc2Grid');
    gridEl.addEventListener('click', (e) => {
      const card = e.target.closest('.tc2-card');
      if (card) openModal(card.getAttribute('data-code'));
    });
    gridEl.addEventListener('keydown', (e) => {
      const card = e.target.closest('.tc2-card');
      if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openModal(card.getAttribute('data-code')); }
    });

    // search
    const input = $('tc2Search');
    input.addEventListener('input', (e) => { search = e.target.value; renderGrid(); });
    function submitSearch() {
      search = input.value; renderGrid();
      const exact = AREAS.find((a) => a.code.toLowerCase() === search.trim().toLowerCase().replace(/\s+/g, ''));
      if (exact) openModal(exact.code);
      else if (MOBILE.matches) input.blur(); // drops the keyboard so results are visible
    }
    $('tc2SearchBtn').addEventListener('click', submitSearch);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submitSearch(); } });

    // filters (desktop only — hidden on mobile via CSS)
    document.querySelectorAll('.tc2-filters button').forEach((btn) => {
      btn.addEventListener('click', () => {
        filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.tc2-filters button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid();
      });
    });

    // modal
    $('tc2ModalClose').addEventListener('click', closeModal);
    $('tc2ModalOverlay').addEventListener('click', (e) => { if (e.target.id === 'tc2ModalOverlay') closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // ?q= from the homepage teaser
    const q0 = new URLSearchParams(location.search).get('q');
    if (q0) {
      search = q0; input.value = q0;
      setTimeout(() => {
        const target = $('territory-checker');
        if (typeof lenis !== 'undefined') lenis.scrollTo(target, { offset: -70 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }, 700);
    }

    renderGrid(); renderMap(); renderMarquee();
    if (MOBILE.addEventListener) MOBILE.addEventListener('change', renderGrid);
    else MOBILE.addListener(renderGrid);

    const statsEl = document.querySelector('.tc2-stats');
    if (statsEl && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { countUp(); obs.disconnect(); } });
      }, { threshold: .4 });
      obs.observe(statsEl);
    } else countUp();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();