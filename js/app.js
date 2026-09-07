/* ═══════════════════════════════════════════════════════════
   GANESH UTSAV 2026 — Sheth Family
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    for (var k in attrs) { n.setAttribute(k, attrs[k]); }
    return n;
  }

  /* ─────────────────────────────────────────────
     Generated ornaments
     ───────────────────────────────────────────── */
  function buildMandala(g) {
    if (!g) return;
    var cx = 200, cy = 200;
    // concentric rings
    [58, 92, 126, 160, 188].forEach(function (r, i) {
      g.appendChild(el('circle', {
        cx: cx, cy: cy, r: r, fill: 'none',
        stroke: 'currentColor', 'stroke-width': i % 2 ? 1 : 1.8, opacity: 0.85
      }));
    });
    // petal rings
    [{ n: 12, r0: 58, r1: 92, w: 16 }, { n: 20, r0: 92, r1: 126, w: 10 },
     { n: 28, r0: 126, r1: 160, w: 7 }, { n: 36, r0: 160, r1: 188, w: 5 }]
      .forEach(function (ring) {
        for (var i = 0; i < ring.n; i++) {
          var a = (i / ring.n) * Math.PI * 2;
          var p = el('path', {
            d: 'M' + cx + ' ' + (cy - ring.r0) +
               ' C' + (cx - ring.w) + ' ' + (cy - ring.r0 - (ring.r1 - ring.r0) * 0.45) +
               ' ' + (cx - ring.w) + ' ' + (cy - ring.r1 + (ring.r1 - ring.r0) * 0.2) +
               ' ' + cx + ' ' + (cy - ring.r1) +
               ' C' + (cx + ring.w) + ' ' + (cy - ring.r1 + (ring.r1 - ring.r0) * 0.2) +
               ' ' + (cx + ring.w) + ' ' + (cy - ring.r0 - (ring.r1 - ring.r0) * 0.45) +
               ' ' + cx + ' ' + (cy - ring.r0) + ' Z',
            fill: 'none', stroke: 'currentColor', 'stroke-width': 1.1, opacity: 0.7,
            transform: 'rotate(' + (a * 180 / Math.PI) + ' ' + cx + ' ' + cy + ')'
          });
          g.appendChild(p);
        }
      });
    // inner lotus
    for (var j = 0; j < 8; j++) {
      g.appendChild(el('path', {
        d: 'M200 200 C182 176 182 148 200 128 C218 148 218 176 200 200 Z',
        fill: 'currentColor', opacity: 0.16,
        transform: 'rotate(' + (j * 45) + ' 200 200)'
      }));
    }
    g.appendChild(el('circle', { cx: cx, cy: cy, r: 20, fill: 'currentColor', opacity: 0.3 }));
  }

  function buildRays(g) {
    if (!g) return;
    for (var i = 0; i < 32; i++) {
      var long = i % 2 === 0;
      g.appendChild(el('path', {
        d: long ? 'M200 34 L206 96 L194 96 Z' : 'M200 62 L204 100 L196 100 Z',
        fill: 'currentColor', opacity: long ? 0.55 : 0.3,
        transform: 'rotate(' + (i * 11.25) + ' 200 200)'
      }));
    }
  }

  /* The toran is drawn at true pixel scale (viewBox === element size) so the
     marigolds stay round instead of being stretched by the viewBox. */
  function buildToran() {
    var svg = $('.toran');
    var g = $('#toranFlowers');
    var path = $('#toranPath');
    if (!svg || !g || !path) return;

    var W = Math.round(svg.clientWidth) || 1200;
    var H = Math.round(svg.clientHeight) || 120;
    if (W < 10) return;

    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'none');

    // a double swag hanging from the top corners
    var sag = H * 0.42;
    var d = 'M0 2 Q' + (W * 0.25) + ' ' + sag + ' ' + (W * 0.5) + ' ' + (sag * 0.62) +
            ' Q' + (W * 0.75) + ' ' + (sag * 0.12) + ' ' + W + ' ' + (sag * 0.8);
    path.setAttribute('d', d);
    g.textContent = '';

    var len = path.getTotalLength();
    var step = 26;                       // px between hangings
    var count = Math.max(8, Math.round(len / step));
    var r = Math.max(5, Math.min(9, H * 0.075));

    for (var i = 0; i <= count; i++) {
      var pt = path.getPointAtLength((i / count) * len);
      // NOTE: position lives on an outer <g> attribute; the CSS sway animation
      // goes on an inner <g>, because a CSS transform would override the attribute.
      var pos = el('g', {
        transform: 'translate(' + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1) + ')'
      });
      var wrap = el('g', {
        'class': 'toran-flower',
        style: 'animation-delay:' + (-(i % 7) * 0.42).toFixed(2) + 's'
      });
      pos.appendChild(wrap);
      if (i % 3 === 2) {
        // mango leaf
        wrap.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: r, stroke: '#3F6B2B', 'stroke-width': 1.5 }));
        wrap.appendChild(el('path', {
          d: 'M0 ' + r + ' C' + (-r) + ' ' + (r * 2) + ' ' + (-r * 0.85) + ' ' + (r * 4) + ' 0 ' + (r * 5) +
             ' C' + (r * 0.85) + ' ' + (r * 4) + ' ' + r + ' ' + (r * 2) + ' 0 ' + r + ' Z',
          fill: 'url(#gradLeaf)'
        }));
      } else {
        // marigold on a short stem
        var drop = r * (i % 2 ? 2.6 : 1.7);
        wrap.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: drop, stroke: '#3F6B2B', 'stroke-width': 1.6 }));
        wrap.appendChild(el('circle', { cx: 0, cy: drop + r, r: r, fill: 'url(#gradMarigold)' }));
        wrap.appendChild(el('circle', { cx: 0, cy: drop + r, r: r * 0.55, fill: '#FFD36A', opacity: 0.8 }));
        wrap.appendChild(el('circle', { cx: 0, cy: drop + r, r: r * 0.22, fill: '#C8551A' }));
      }
      g.appendChild(pos);
    }
  }

  function buildDust(layer) {
    if (!layer || reduced) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 46; i++) {
      var d = document.createElement('span');
      var size = 1.5 + Math.random() * 3.5;
      d.className = 'dust';
      d.style.cssText =
        'left:' + (Math.random() * 100).toFixed(2) + '%;' +
        'top:' + (55 + Math.random() * 50).toFixed(2) + '%;' +
        'width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;' +
        '--dx:' + ((Math.random() - 0.5) * 90).toFixed(0) + 'px;' +
        'animation-duration:' + (7 + Math.random() * 11).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 14).toFixed(1) + 's';
      frag.appendChild(d);
    }
    layer.appendChild(frag);
  }

  buildMandala($('#mandalaL'));
  buildMandala($('#mandalaR'));
  buildRays($('#rays'));
  buildDust($('#dustLayer'));
  requestAnimationFrame(buildToran);

  var toranTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(toranTimer);
    toranTimer = setTimeout(buildToran, 180);
  });

  /* ─────────────────────────────────────────────
     Audio — bundled aarti if present, else a
     synthesised temple ambience (bell + drone)
     ───────────────────────────────────────────── */
  var Audio_ = (function () {
    var ctx = null, master = null, timer = null, nodes = [], on = false;
    var track = new window.Audio('assets/aarti.mp3');
    track.loop = true; track.volume = 0.5; track.preload = 'none';
    var haveTrack = false;

    track.addEventListener('canplaythrough', function () { haveTrack = true; }, { once: true });

    function ring(when, base, gainPeak) {
      // struck temple bell: inharmonic partials with exponential decay
      var partials = [1, 2.02, 2.98, 4.12, 5.43, 6.79];
      var gains = [1, 0.5, 0.34, 0.22, 0.14, 0.08];
      partials.forEach(function (p, i) {
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = base * p;
        g.gain.setValueAtTime(0, when);
        g.gain.linearRampToValueAtTime(gainPeak * gains[i], when + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, when + 3.2 + i * 0.25);
        o.connect(g); g.connect(master);
        o.start(when); o.stop(when + 4.2);
      });
    }

    function drone() {
      // soft tanpura-like Sa–Pa drone
      [146.83, 220.00, 293.66].forEach(function (f, i) {
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        var lfo = ctx.createOscillator();
        var lfoG = ctx.createGain();
        o.type = i === 0 ? 'triangle' : 'sine';
        o.frequency.value = f;
        g.gain.value = 0;
        g.gain.linearRampToValueAtTime(0.035 / (i + 1), ctx.currentTime + 2.5);
        lfo.frequency.value = 0.12 + i * 0.05;
        lfoG.gain.value = 0.4;
        lfo.connect(lfoG); lfoG.connect(o.frequency);
        o.connect(g); g.connect(master);
        o.start(); lfo.start();
        nodes.push(o, lfo);
      });
    }

    function startSynth() {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      drone();
      ring(ctx.currentTime + 0.15, 392, 0.16);
      timer = setInterval(function () {
        ring(ctx.currentTime + 0.05, Math.random() < 0.5 ? 392 : 523.25, 0.11 + Math.random() * 0.05);
      }, 6400);
    }

    function stopSynth() {
      if (timer) { clearInterval(timer); timer = null; }
      nodes.forEach(function (n) { try { n.stop(); } catch (e) {} });
      nodes = [];
      if (master) { try { master.disconnect(); } catch (e) {} master = null; }
    }

    return {
      toggle: function () {
        on = !on;
        if (on) {
          if (haveTrack) { track.play().catch(startSynth); } else { startSynth(); }
        } else {
          track.pause();
          stopSynth();
        }
        return on;
      },
      isOn: function () { return on; },
      // one-shot bell for interactions
      ding: function () {
        try {
          var c = new (window.AudioContext || window.webkitAudioContext)();
          var o = c.createOscillator(), g = c.createGain();
          o.type = 'sine'; o.frequency.value = 880;
          g.gain.setValueAtTime(0.0001, c.currentTime);
          g.gain.exponentialRampToValueAtTime(0.13, c.currentTime + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 1.6);
          o.connect(g); g.connect(c.destination);
          o.start(); o.stop(c.currentTime + 1.7);
          setTimeout(function () { c.close(); }, 2000);
        } catch (e) {}
      }
    };
  })();

  /* ─────────────────────────────────────────────
     Curtain
     ───────────────────────────────────────────── */
  var curtain = $('#curtain');
  var opened = false;

  function openCurtain() {
    if (opened) return;
    opened = true;
    Audio_.ding();
    curtain.classList.add('is-open');
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-open');
    $$('.reveal-h').forEach(function (n) { n.style.setProperty('--step', n.dataset.step || 1); });
    showersPetals(26);
    setTimeout(function () { curtain.classList.add('is-gone'); }, 2200);
  }

  $('#sealBtn').addEventListener('click', openCurtain);

  // ?skip — deep-link straight past the curtain (handy for previews / re-visits)
  if (/(^|[?&])skip(=|&|$)/.test(location.search)) {
    curtain.classList.add('is-gone');
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-open');
    opened = true;
    $$('.reveal-h').forEach(function (n) { n.style.setProperty('--step', n.dataset.step || 1); });
  }

  /* ─────────────────────────────────────────────
     Scroll reveals
     ───────────────────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  $$('.reveal').forEach(function (n, i) {
    n.style.transitionDelay = (Math.min(i % 5, 4) * 0.09).toFixed(2) + 's';
    io.observe(n);
  });

  /* ─────────────────────────────────────────────
     Petals / pushpanjali
     ───────────────────────────────────────────── */
  var petalLayer = $('#petalLayer');
  var KINDS = ['', 'p-rose', 'p-white'];

  function showersPetals(count) {
    if (reduced || !petalLayer) return;
    for (var i = 0; i < count; i++) {
      (function (i) {
        setTimeout(function () {
          var p = document.createElement('span');
          var size = 9 + Math.random() * 12;
          var dur = 5 + Math.random() * 5;
          p.className = 'petal ' + KINDS[(Math.random() * KINDS.length) | 0];
          p.style.cssText =
            'left:' + (Math.random() * 100).toFixed(2) + '%;' +
            'width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) + 'px;' +
            '--dx:' + ((Math.random() - 0.5) * 260).toFixed(0) + 'px;' +
            '--rot:' + ((Math.random() * 900 - 300) | 0) + 'deg;' +
            'animation-duration:' + dur.toFixed(1) + 's';
          petalLayer.appendChild(p);
          setTimeout(function () { p.remove(); }, dur * 1000 + 200);
        }, i * 90);
      })(i);
    }
  }

  var countEl = $('#pushpCount');
  var count = 0;
  try { count = parseInt(localStorage.getItem('gu26-pushpanjali') || '0', 10) || 0; } catch (e) {}
  countEl.textContent = count;

  $('#pushpBtn').addEventListener('click', function () {
    count += 1;
    countEl.textContent = count;
    try { localStorage.setItem('gu26-pushpanjali', String(count)); } catch (e) {}
    showersPetals(18);
    Audio_.ding();
    if (count === 1) toast('🌸 पुष्पांजली अर्पण — Bappa bless you');
    else if (count % 11 === 0) toast('🙏 ' + count + ' pushpanjali offered · गणपती बाप्पा मोरया');
  });

  /* ─────────────────────────────────────────────
     Music toggle
     ───────────────────────────────────────────── */
  var musicBtn = $('#musicBtn');
  musicBtn.addEventListener('click', function () {
    var on = Audio_.toggle();
    musicBtn.setAttribute('aria-pressed', String(on));
    $('use', musicBtn).setAttribute('href', on ? '#i-sound-on' : '#i-sound-off');
    toast(on ? '🔔 Temple ambience on' : 'Sound off');
  });

  /* ─────────────────────────────────────────────
     Day modal
     ───────────────────────────────────────────── */
  var DAYS = {
    1: {
      day: 'Day One',
      title: '14<sup>th</sup> September',
      time: 'Sthapana &amp; Darshan',
      desc: 'Bappa arrives home. Join us for the Sthapana, the first aarti and darshan — and take His blessings with your family.'
    },
    2: {
      day: 'Day Two',
      title: '15<sup>th</sup> September',
      time: 'Darshan &amp; Aarti',
      desc: 'A full day of darshan, prasad and aarti. Come whenever you can — our doors stay open for you all day.'
    },
    3: {
      day: 'Day Three',
      title: '🪔 Ganesh Visarjan',
      time: 'Visarjan Aarti — 7:30 PM',
      desc: 'The final aarti before we bid Bappa farewell. Do join us at 7:30 PM for the Visarjan Aarti and the send-off.<br /><br />🙏 मंगलमूर्ती मोरया 🙏'
    }
  };

  var modal = $('#modal');
  var lastFocus = null;

  function openModal(key) {
    var d = DAYS[key];
    if (!d) return;
    $('#modalDay').textContent = d.day;
    $('#modalTitle').innerHTML = d.title;
    $('#modalTime').innerHTML = d.time;
    $('#modalDesc').innerHTML = d.desc;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('is-locked');
    $('.modal-close', modal).focus();
    Audio_.ding();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  }

  $$('.tl-node').forEach(function (b) {
    b.addEventListener('click', function () { openModal(b.dataset.day); });
  });
  $$('[data-close]', modal).forEach(function (n) { n.addEventListener('click', closeModal); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ─────────────────────────────────────────────
     Share
     ───────────────────────────────────────────── */
  $('#shareBtn').addEventListener('click', function () {
    var data = {
      title: 'Ganesh Utsav 2026 · Sheth Family',
      text: '🙏 गणपती बाप्पा मोरया 🙏\nYou are warmly invited for Bappa’s Darshan on 14th, 15th & 16th September.',
      url: location.href
    };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(location.href)
        .then(function () { toast('Invitation link copied 🙏'); })
        .catch(function () { toast(location.href); });
    } else {
      toast(location.href);
    }
  });

  /* ─────────────────────────────────────────────
     Toast
     ───────────────────────────────────────────── */
  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ─────────────────────────────────────────────
     Gentle parallax on the shrine
     ───────────────────────────────────────────── */
  if (!reduced) {
    var shrine = $('.shrine');
    var heroCopy = $('.hero-copy');
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          shrine.style.transform = 'translateY(' + (y * 0.16).toFixed(1) + 'px)';
          heroCopy.style.transform = 'translateY(' + (y * -0.05).toFixed(1) + 'px)';
          heroCopy.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.75)).toFixed(2);
        }
        ticking = false;
      });
    }, { passive: true });
  }
})();
