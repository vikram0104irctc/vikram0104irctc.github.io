/* ====================================
   VIKRAM KUMAR CHOUDHARY – PORTFOLIO
   Premium JavaScript v3.0
==================================== */

'use strict';

/* ===== SCROLL PROGRESS BAR ===== */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });
})();

/* ===== LOADER ===== */
(function initLoader() {
  const loader = document.getElementById('loader');
  document.body.style.overflow = 'hidden';
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2000);
  });
})();

/* ===== CUSTOM CURSOR WITH TRAIL ===== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  const TRAIL_COUNT = 6;
  const trailDots = [];
  const trailPositions = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const size = Math.max(2, 6 - i);
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      opacity: ${(0.5 - i * 0.07).toFixed(2)};
    `;
    document.body.appendChild(dot);
    trailDots.push(dot);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  (function animateAll() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    for (let i = TRAIL_COUNT - 1; i > 0; i--) {
      trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.25;
      trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.25;
    }
    trailPositions[0].x += (mouseX - trailPositions[0].x) * 0.4;
    trailPositions[0].y += (mouseY - trailPositions[0].y) * 0.4;

    trailDots.forEach((dot, i) => {
      dot.style.left = trailPositions[i].x + 'px';
      dot.style.top = trailPositions[i].y + 'px';
      dot.style.opacity = (0.45 - i * 0.06).toFixed(2);
    });

    requestAnimationFrame(animateAll);
  })();
})();

/* ===== NAVBAR ===== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
})();

/* ===== TYPED TEXT (ROLE) ===== */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'Backend Engineer',
    'Full Stack Developer',
    'Node.js Specialist',
    'AWS Cloud Engineer',
    'API Architect',
    'SDE-2 Engineer',
  ];

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = strings[stringIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; type(); }, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
      }
    }

    if (!isPaused) {
      setTimeout(type, isDeleting ? 35 : 75);
    }
  }

  setTimeout(type, 1400);
})();

/* ===== SIGNATURE: HERO SYSTEM CONSOLE ===== */
(function initHeroConsole() {
  const body = document.getElementById('console-body');
  if (!body) return;

  const entries = [
    { cmd: 'curl -s api/vikram/whoami', result: '<span class="ok">200 OK</span> — Vikram Choudhary, Backend Engineer · Gurugram, IN' },
    { cmd: 'curl -s api/experience?filter=current', result: 'Veritas Global Law · SDE-2 · Jan 2026 – Present' },
    { cmd: 'curl -s api/metrics/throughput', result: '<span class="ok">+40%</span> via Redis caching &amp; query optimization' },
    { cmd: 'curl -s api/metrics/uptime', result: '<span class="ok">99.9%</span> maintained · PM2 + Nginx deployment pipeline' },
    { cmd: 'curl -s api/projects/sandhee --stats', result: '<span class="gold">100,000+</span> legal cases automated end-to-end' },
    { cmd: 'curl -s api/status/availability', result: '<span class="ok">open</span> — accepting new backend / full-stack roles' },
  ];

  let entryIndex = 0;
  let charIndex = 0;
  const typeSpeed = 26;
  const lineDelay = 1500;
  let isPaused = false;
  let activeTimer = null;

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function renderStaticLines(upTo) {
    body.innerHTML = '';
    for (let i = 0; i < upTo; i++) {
      const e = entries[i];
      const lineWrap = document.createElement('div');
      lineWrap.className = 'console-line';
      lineWrap.innerHTML = `<span class="console-prompt">$</span><span class="console-cmd">${e.cmd}</span><span class="console-result">${e.result}</span>`;
      body.appendChild(lineWrap);
    }
    scrollToBottom();
  }

  function typeCurrentLine() {
    if (isPaused) return;
    const e = entries[entryIndex];
    renderStaticLines(entryIndex);

    const lineWrap = document.createElement('div');
    lineWrap.className = 'console-line';
    const cmdSpan = document.createElement('span');
    cmdSpan.className = 'console-cmd';
    lineWrap.innerHTML = `<span class="console-prompt">$</span>`;
    lineWrap.appendChild(cmdSpan);
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'console-cursor-blink';
    lineWrap.appendChild(cursorSpan);
    body.appendChild(lineWrap);
    scrollToBottom();

    charIndex = 0;

    function typeChar() {
      if (isPaused) {
        activeTimer = setTimeout(typeChar, 100);
        return;
      }
      if (charIndex <= e.cmd.length) {
        cmdSpan.textContent = e.cmd.slice(0, charIndex);
        charIndex++;
        scrollToBottom();
        activeTimer = setTimeout(typeChar, typeSpeed);
      } else {
        cursorSpan.remove();
        const resultSpan = document.createElement('span');
        resultSpan.className = 'console-result';
        resultSpan.innerHTML = e.result;
        lineWrap.appendChild(resultSpan);
        scrollToBottom();

        activeTimer = setTimeout(() => {
          if (isPaused) { activeTimer = setTimeout(() => { if (!isPaused) advanceEntry(); }, 200); return; }
          advanceEntry();
        }, lineDelay);
      }
    }

    function advanceEntry() {
      entryIndex++;
      if (entryIndex >= entries.length) {
        activeTimer = setTimeout(() => {
          entryIndex = 0;
          typeCurrentLine();
        }, lineDelay * 1.4);
      } else {
        typeCurrentLine();
      }
    }

    typeChar();
  }

  // Pause typing when hero is not in view — prevents off-screen layout thrash
  const consoleWrapper = document.getElementById('hero-console-wrapper');
  const visibilityObserver = new IntersectionObserver((obs) => {
    obs.forEach(entry => {
      isPaused = !entry.isIntersecting;
    });
  }, { threshold: 0.05 });

  if (consoleWrapper) {
    visibilityObserver.observe(consoleWrapper);
    // Kick off once it first becomes visible
    const startObserver = new IntersectionObserver((entries2) => {
      entries2.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeCurrentLine, 600);
          startObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    startObserver.observe(consoleWrapper);
  } else {
    setTimeout(typeCurrentLine, 1000);
  }
})();

/* ===== COUNTER ANIMATION ===== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2200;
    const steps = 70;
    let step = 0;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const timer = setInterval(() => {
      step++;
      const progress = easeOut(step / steps);
      el.textContent = Math.round(progress * target);
      if (step >= steps) {
        el.textContent = target;
        clearInterval(timer);
      }
    }, duration / steps);
  }
})();

/* ===== SCROLL REVEAL ===== */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const container = entry.target.closest(
        '.section-container, .skills-grid, .projects-grid, .timeline, .about-highlights, .github-cards-row, .hero'
      );
      const siblings = container
        ? container.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
        : [];

      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 100;
      });

      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ===== AURORA PARTICLES ===== */
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 18 : 45;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    const hue = Math.random() > 0.5 ? '162' : '195'; // emerald or cyan
    const dur = Math.random() * 12 + 8;
    const delay = Math.random() * 8;

    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: hsla(${hue}, 80%, 65%, ${Math.random() * 0.5 + 0.15});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat${i} ${dur}s ease-in-out ${delay}s infinite;
      pointer-events: none;
    `;
    container.appendChild(p);

    const tx = (Math.random() - 0.5) * 60;
    const ty = (Math.random() - 0.5) * 60;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat${i} {
        0%,100% { transform: translate(0,0) scale(1); opacity: ${(Math.random() * 0.3 + 0.15).toFixed(2)}; }
        33%  { transform: translate(${tx}px,${ty}px) scale(${(Math.random() * 0.4 + 0.8).toFixed(2)}); opacity: ${(Math.random() * 0.5 + 0.3).toFixed(2)}; }
        66%  { transform: translate(${-tx * 0.5}px,${ty * 0.7}px) scale(${(Math.random() * 0.3 + 0.9).toFixed(2)}); opacity: ${(Math.random() * 0.3 + 0.1).toFixed(2)}; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ===== HERO IMAGE 3D PARALLAX ===== */
(function initHeroParallax() {
  const wrapper = document.querySelector('.hero-image-wrapper');
  const img = document.querySelector('.hero-img');
  if (!wrapper || !img || window.innerWidth < 1024) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    targetX = x * 16;
    targetY = y * 16;
  });

  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  (function lerpParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    if (wrapper.style) {
      wrapper.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg)`;
    }
    requestAnimationFrame(lerpParallax);
  })();
})();

/* ===== MAGNETIC BUTTONS ===== */
(function initMagneticButtons() {
  if (window.innerWidth < 1024) return;

  document.querySelectorAll('.btn-primary, .btn-secondary, .btn-resume').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ===== TECH MARQUEE ===== */
(function initMarquee() {
  const track = document.querySelector('.tech-marquee-track');
  if (!track) return;

  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();

/* ===== PROJECT CARD 3D TILT ===== */
(function initTilt() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `
        translateY(-8px)
        perspective(1200px)
        rotateX(${-y * 8}deg)
        rotateY(${x * 8}deg)
        scale(1.01)
      `;
      card.style.transition = 'none';

      const shine = card.querySelector('.card-shine') || (() => {
        const s = document.createElement('div');
        s.className = 'card-shine';
        s.style.cssText = `
          position: absolute; inset: 0; border-radius: inherit;
          pointer-events: none; z-index: 10;
          background: radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
            rgba(255,255,255,0.06) 0%, transparent 60%);
        `;
        card.style.position = 'relative';
        card.appendChild(s);
        return s;
      })();

      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
        rgba(255,255,255,0.07) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      const shine = card.querySelector('.card-shine');
      if (shine) shine.remove();
    });
  });
})();

/* ===== SKILL TAG RIPPLE ===== */
(function initSkillRipple() {
  const kf = document.createElement('style');
  kf.textContent = `
    @keyframes rippleEffect { to { transform: scale(1); opacity: 0; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes formShake {
      0%,100%{ transform:translateX(0) }
      20%{ transform:translateX(-10px) }
      40%{ transform:translateX(10px) }
      60%{ transform:translateX(-6px) }
      80%{ transform:translateX(6px) }
    }
    @keyframes confettiFall {
      0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(kf);

  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = tag.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(0,224,164,0.25);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.5s ease forwards;
        pointer-events: none;
      `;
      tag.style.position = 'relative';
      tag.style.overflow = 'hidden';
      tag.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
})();

/* ===== CONTACT FORM ===== */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('btn-send-message');
  if (!form) return;

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxB4ZMwTDbV57T52YiM3pSw2-r4JwMCV6D0zygY8nyGQVj7vFWEDRIvnfrUY1seY1_c/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      form.style.animation = 'formShake 0.5s ease';
      setTimeout(() => { form.style.animation = ''; }, 500);
      return;
    }

    submitBtn.disabled = true;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="ri-loader-4-line" style="animation:spin 0.8s linear infinite;"></i>';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
      });

      form.reset();
      if (successMsg) {
        successMsg.removeAttribute('hidden');
        launchConfetti();
        setTimeout(() => successMsg.setAttribute('hidden', ''), 7000);
      }
    } catch (err) {
      submitBtn.innerHTML = '<span>Failed — email me directly</span><i class="ri-close-circle-line"></i>';
      setTimeout(() => { submitBtn.innerHTML = originalHTML; }, 3000);
      return;
    } finally {
      submitBtn.disabled = false;
      if (!submitBtn.innerHTML.includes('Failed')) {
        submitBtn.innerHTML = originalHTML;
      }
    }
  });

  function launchConfetti() {
    const colors = ['#00e0a4', '#35c7ea', '#9df5d6', '#d8b26a', '#4de8bd'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -20px;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation: confettiFall ${Math.random() * 2 + 2}s ${Math.random()}s linear forwards;
        z-index: 99999;
        pointer-events: none;
      `;
      document.body.appendChild(confetti);
      confetti.addEventListener('animationend', () => confetti.remove());
    }
  }
})();

/* ===== RESUME DOWNLOAD ===== */
function downloadResume(event) {
  event.preventDefault();
  const url = event.currentTarget.href;
  window.open(url, '_blank');
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Vikram_Software_Engineer_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ===== THEME TOGGLE ===== */
(function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('vkc-theme') || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('vkc-theme', next);
  });
})();

/* ===== ACCENT COLOR PICKER ===== */
(function initColorPicker() {
  const toggleBtn = document.getElementById('color-picker-toggle');
  const swatchesEl = document.getElementById('color-swatches');
  const swatches = swatchesEl ? swatchesEl.querySelectorAll('.color-swatch') : [];
  const root = document.documentElement;

  if (!toggleBtn || !swatchesEl) return;

  // Restore saved color
  const savedColor = JSON.parse(localStorage.getItem('vkc-accent') || 'null');
  if (savedColor) {
    applyColor(savedColor.h, savedColor.s, savedColor.l);
    // Update active swatch
    swatches.forEach(s => {
      s.classList.toggle('active', s.dataset.h === String(savedColor.h));
    });
  }

  function applyColor(h, s, l) {
    root.style.setProperty('--accent-h', h);
    root.style.setProperty('--accent-s', s);
    root.style.setProperty('--accent-l', l);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    swatchesEl.classList.toggle('open');
  });

  swatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      const h = swatch.dataset.h;
      const s = swatch.dataset.s;
      const l = swatch.dataset.l;
      applyColor(h, s, l);
      swatches.forEach(s2 => s2.classList.remove('active'));
      swatch.classList.add('active');
      localStorage.setItem('vkc-accent', JSON.stringify({ h, s, l }));
      swatchesEl.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!document.getElementById('color-picker-panel').contains(e.target)) {
      swatchesEl.classList.remove('open');
    }
  });
})();

/* ===== SMOOTH SCROLL ===== */
(function initSmoothScroll() {
  const navbar = document.getElementById('navbar');
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.getBoundingClientRect().height : 70;
        const offset = target.getBoundingClientRect().top + window.scrollY - navH - 8;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });
})();

/* ===== INITIAL ACTIVE LINK ===== */
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash || '#home';
  const link = document.querySelector(`.nav-link[href="${hash}"]`);
  if (link) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  }
});

/* ===== CONSOLE EASTER EGG ===== */
console.log(
  '%c ✦ Vikram Kumar Choudhary ✦ ',
  'background: linear-gradient(135deg, #00e0a4, #35c7ea); color: #04140f; padding: 12px 24px; border-radius: 10px; font-size: 18px; font-weight: bold; letter-spacing: 1px;'
);
console.log(
  '%c Software Development Engineer II | Node.js · React · AWS | Gurugram, India ',
  'color: #4de8bd; font-size: 13px; font-style: italic;'
);
console.log(
  '%c 📧 vikram0104irctc@gmail.com | 🔗 linkedin.com/in/vikram-kumar-choudhary ',
  'color: #35c7ea; font-size: 12px;'
);