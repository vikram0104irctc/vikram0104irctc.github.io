/* ====================================
   VIKRAM KUMAR CHOUDHARY – PORTFOLIO
   Premium JavaScript Module
==================================== */

'use strict';

/* ===== LOADER ===== */
(function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger initial animations after loader
      triggerHeroAnimations();
    }, 2000);
  });
  document.body.style.overflow = 'hidden';
})();

/* ===== CUSTOM CURSOR ===== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth follower
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide cursor on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
})();

/* ===== NAVBAR ===== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  // Scroll handler
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;

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

/* ===== TYPED TEXT ANIMATION ===== */
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

  const TYPE_SPEED = 80;
  const DELETE_SPEED = 40;
  const PAUSE_DURATION = 2000;

  function type() {
    const current = strings[stringIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          type();
        }, PAUSE_DURATION);
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
      setTimeout(type, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }
  }

  setTimeout(type, 1200);
})();

/* ===== HERO ANIMATIONS ===== */
function triggerHeroAnimations() {
  const badge = document.getElementById('hero-badge');
  const title = document.getElementById('hero-title');
  const desc = document.getElementById('hero-desc');
  const stats = document.getElementById('hero-stats');
  const actions = document.getElementById('hero-actions');
  const socials = document.getElementById('hero-socials');
  const image = document.getElementById('hero-image');

  // These are already CSS-animated via keyframes
}

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

  counters.forEach(counter => observer.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      el.textContent = current;

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
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.closest('.section-container, .skills-grid, .projects-grid, .timeline, .about-highlights, .github-cards-row')
          ?.querySelectorAll('.reveal-up, .reveal-left, .reveal-right') || [];

        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) {
            delay = idx * 80;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* ===== PARTICLES ===== */
(function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
  }

  // Add keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(1.2); opacity: 0.8; }
      50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -40}px) scale(0.8); opacity: 0.5; }
      75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 20}px) scale(1.1); opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
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
      shakeForm();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i>';

    // Add spin keyframe
    addSpinKeyframe();

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
      });

      form.reset();

      // Show success message only after successful submission
      if (successMsg) {
        successMsg.removeAttribute('hidden');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          successMsg.setAttribute('hidden', '');
        }, 7000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // Show generic error in button area
      submitBtn.innerHTML = '<span>Failed — try emailing directly</span><i class="ri-close-circle-line"></i>';
      setTimeout(() => { submitBtn.innerHTML = originalContent; }, 3000);
      return; // Don't restore button in finally
    } finally {
      submitBtn.disabled = false;
      if (!submitBtn.innerHTML.includes('Failed')) {
        submitBtn.innerHTML = originalContent;
      }
    }
  });

  function shakeForm() {
    form.style.animation = 'formShake 0.4s ease';
    addShakeKeyframe();
    setTimeout(() => {
      form.style.animation = '';
    }, 400);
  }

  function addSpinKeyframe() {
    if (!document.getElementById('spin-kf')) {
      const s = document.createElement('style');
      s.id = 'spin-kf';
      s.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
      document.head.appendChild(s);
    }
  }

  function addShakeKeyframe() {
    if (!document.getElementById('shake-kf')) {
      const s = document.createElement('style');
      s.id = 'shake-kf';
      s.textContent = '@keyframes formShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }';
      document.head.appendChild(s);
    }
  }
})();

/* ===== RESUME DOWNLOAD ===== */
function downloadResume(event) {
  event.preventDefault();
  const url = event.currentTarget.href;
  // Open in new tab
  window.open(url, '_blank');
  // Also trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Vikram_Software_Engineer_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ===== SMOOTH SCROLL ENHANCEMENT ===== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ===== SKILL TAG HOVER RIPPLE ===== */
(function initSkillRipple() {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = tag.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(99, 102, 241, 0.3);
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

  // Add ripple keyframe
  const s = document.createElement('style');
  s.textContent = '@keyframes rippleEffect { to { transform: scale(1); opacity: 0; } }';
  document.head.appendChild(s);
})();

/* ===== NAVBAR LINK ACTIVE ON LOAD ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Set initial active link
  const hash = window.location.hash || '#home';
  const link = document.querySelector(`.nav-link[href="${hash}"]`);
  if (link) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  }
});

/* ===== PERFORMANCE: LAZY LOAD GITHUB IMAGES ===== */
(function initLazyGitHub() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
})();

/* ===== TILT EFFECT ON PROJECT CARDS ===== */
(function initTilt() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `
        translateY(-6px) 
        perspective(1000px) 
        rotateX(${-y * 6}deg) 
        rotateY(${x * 6}deg)
        scale(1.01)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();

console.log(
  '%c Vikram Kumar Choudhary ',
  'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 10px 20px; border-radius: 8px; font-size: 16px; font-weight: bold;'
);
console.log(
  '%c Backend-Focused Full Stack Engineer | vikram0104irctc@gmail.com ',
  'color: #818cf8; font-size: 13px;'
);
