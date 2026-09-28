/* ILYAN BENDIB — Portfolio : scripts partagés */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- Écran de chargement : le monogramme IB se dessine ----
     Durée minimale 1,5 s. Si la page met plus longtemps à charger,
     le dessin ralentit et ne se termine qu'une fois tout chargé. */
  const loader = $('#loader');
  if (loader) {
    const MIN = 1500;
    const letters = [
      { el: $('.ld-i', loader), len: 320, from: 0, to: .42 },    // d'abord le I
      { el: $('.ld-b', loader), len: 560, from: .38, to: .9 },   // puis le B
    ];
    // p de 0 à 1 : le contour doré se trace lettre par lettre, puis les lettres se remplissent
    const draw = p => letters.forEach(l => {
      const k = Math.min(1, Math.max(0, (p - l.from) / (l.to - l.from)));
      l.el.style.strokeDasharray = l.len;
      l.el.style.strokeDashoffset = l.len * (1 - k);
      l.el.style.fillOpacity = Math.min(1, Math.max(0, (p - .9) / .1));
    });
    // recadre le dessin autour des deux lettres une fois la police chargée
    const fit = () => {
      try {
        const g = $('.ld-g', loader), b = g.getBBox(), m = 6;
        $('.ld-mono', loader).setAttribute('viewBox', `${b.x - m} ${b.y - m} ${b.width + 2 * m} ${b.height + 2 * m}`);
      } catch (e) {}
    };
    draw(0);
    const ease = x => 1 - Math.pow(1 - x, 2);

    let loaded = document.readyState === 'complete';
    addEventListener('load', () => { loaded = true; });
    setTimeout(() => { loaded = true; }, 8000);        // sécurité : jamais bloqué indéfiniment

    let t0 = performance.now();
    let p = 0, finishFrom = null, finishT = 0;
    const frame = now => {
      const t = now - t0;
      if (finishFrom === null) {
        // tant que ce n'est pas chargé, on s'arrête à 90 % et on avance de plus en plus lentement
        let target = ease(Math.min(1, t / MIN)) * .9;
        if (t > MIN) target = .9 + .08 * (1 - Math.exp(-(t - MIN) / 2500));
        p = Math.max(p, target);
        if (loaded && t >= MIN) { finishFrom = p; finishT = now; }
      }
      if (finishFrom !== null) {
        const k = Math.min(1, (now - finishT) / 350);
        p = finishFrom + (1 - finishFrom) * k;
      }
      draw(p);
      if (p < 1) return requestAnimationFrame(frame);
      loader.classList.add('done');
      setTimeout(() => {
        document.documentElement.classList.remove('is-loading');
        loader.classList.add('up');
        setTimeout(() => loader.classList.add('gone'), 750);
      }, 250);
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(1);
      const end = () => { document.documentElement.classList.remove('is-loading'); loader.classList.add('up', 'gone'); };
      loaded ? end() : addEventListener('load', end);
    } else {
      // on attend la police (max 600 ms) pour que les lettres se dessinent dans la bonne typo
      const go = () => { fit(); t0 = performance.now(); requestAnimationFrame(frame); };
      if (document.fonts && document.fonts.load) {
        Promise.race([document.fonts.load('700 100px Cinzel'), new Promise(r => setTimeout(r, 600))]).then(go, go);
      } else go();
    }

    // Retour arrière du navigateur (page en cache) : pas d'écran
    addEventListener('pageshow', e => { if (e.persisted) { document.documentElement.classList.remove('is-loading'); loader.classList.add('up', 'gone'); } });

    // Changement de page : l'écran redescend (monogramme vide) puis on change de page
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;   // ancre sur la même page
      e.preventDefault();
      draw(0);
      document.documentElement.classList.add('is-loading');
      loader.classList.remove('gone', 'done');
      loader.classList.add('up');
      loader.offsetHeight;
      loader.classList.remove('up');
      setTimeout(() => { location.href = url.href; }, 700);
    });
  }

  /* ---- Nav : fond plein après le scroll ---- */
  const nav = $('.nav');
  const hero = $('.hero');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('solid', scrollY > 60);
    // Accueil : le nom n'apparaît dans la nav qu'une fois le grand titre dépassé
    if (nav.classList.contains('home')) {
      const limit = hero ? hero.offsetHeight * 0.55 : 300;
      nav.classList.toggle('show-logo', scrollY > limit || nav.classList.contains('panel-open'));
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menu « Jeux » (bandeau sous la nav) ---- */
  const btn = $('#gamesBtn'), panel = $('#gamesPanel');
  let scrim = null;
  const setPanel = (open) => {
    if (!panel) return;
    panel.classList.toggle('show', open);
    scrim.classList.toggle('show', open);
    btn.setAttribute('aria-expanded', open);
    nav.classList.toggle('panel-open', open);
    onScroll();
  };
  if (btn && panel) {
    scrim = document.createElement('div');
    scrim.className = 'scrim';
    document.body.appendChild(scrim);
    scrim.addEventListener('click', () => setPanel(false));
    btn.addEventListener('click', () => setPanel(!panel.classList.contains('show')));
    $$('a', panel).forEach(a => a.addEventListener('click', () => setPanel(false)));
  }

  /* ---- Apparition au scroll ---- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---- Showreel (défilé d'images en attendant la vidéo) ---- */
  const reel = $$('.reel img');
  if (reel.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let i = 0;
    setInterval(() => {
      reel[i].classList.remove('on');
      i = (i + 1) % reel.length;
      reel[i].classList.add('on');
    }, 5000);
  }

  /* ---- Lecteur YouTube intégré : la vidéo se lance dans le site ---- */
  $$('.yt[data-id]').forEach(el => {
    const id = el.dataset.id;
    const img = $('img', el);
    if (img && !img.getAttribute('src')) {
      // Miniature YouTube : on essaie la HD, puis on redescend si elle n'existe pas
      // (YouTube renvoie alors une image grise de 120 px au lieu d'une erreur)
      const sizes = ['maxresdefault', 'sddefault', 'hqdefault'];
      let k = 0;
      const next = () => { if (k < sizes.length - 1) img.src = `https://i.ytimg.com/vi/${id}/${sizes[++k]}.jpg`; };
      img.onload = () => { if (img.naturalWidth <= 120) next(); };
      img.onerror = next;
      img.src = `https://i.ytimg.com/vi/${id}/${sizes[0]}.jpg`;
    }
    const play = () => {
      if (el.classList.contains('playing')) return;
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      f.title = el.dataset.title || 'Vidéo';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      el.innerHTML = '';
      el.appendChild(f);
      el.classList.add('playing');
    };
    el.addEventListener('click', play);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  });

  /* ---- Onglets vidéo (pages de jeu) ---- */
  $$('.v-tabs').forEach(tabs => {
    const btns = $$('button', tabs);
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('on', x === b));
      $$('.v-pane', tabs.parentElement).forEach(p => p.classList.toggle('on', p.id === b.dataset.pane));
    }));
  });

  /* ---- Lightbox des galeries ---- */
  const imgs = $$('[data-lb]');
  if (imgs.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt=""><button class="lb-close">Fermer ✕</button><button class="lb-prev" aria-label="Précédente">‹</button><button class="lb-next" aria-label="Suivante">›</button>';
    document.body.appendChild(lb);
    const big = $('img', lb);
    let cur = 0;
    const show = i => { cur = (i + imgs.length) % imgs.length; big.src = imgs[cur].src; big.alt = imgs[cur].alt; lb.classList.add('show'); };
    const close = () => lb.classList.remove('show');
    imgs.forEach((im, i) => im.addEventListener('click', () => show(i)));
    $('.lb-close', lb).onclick = close;
    $('.lb-prev', lb).onclick = e => { e.stopPropagation(); show(cur - 1); };
    $('.lb-next', lb).onclick = e => { e.stopPropagation(); show(cur + 1); };
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('show')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  addEventListener('keydown', e => { if (e.key === 'Escape') setPanel(false); });
})();
