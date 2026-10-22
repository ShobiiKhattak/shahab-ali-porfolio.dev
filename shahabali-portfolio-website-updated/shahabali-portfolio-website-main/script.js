// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ── Custom Cursor (desktop only) ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
  document.querySelectorAll('.custom-cursor, .cursor-ring').forEach(el => el.style.display = 'none');
  document.body.style.cursor = 'auto';
} else {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function smoothRing() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(smoothRing);
  }
  smoothRing();

  const interactive = document.querySelectorAll('a, button, .pill, .service-card, .project-showcase, .btn-primary, .nav-cta');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '14px';
      cursor.style.height = '14px';
      ring.style.width = '38px';
      ring.style.height = '38px';
      ring.style.borderColor = 'rgba(45,212,191,0.9)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '7px';
      cursor.style.height = '7px';
      ring.style.width = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(45,212,191,0.5)';
    });
  });
}

// ── Rotating Role Text ──
const roles = ["Link Builder", "Content Writer", "Digital Marketer", "SEO Expert"];
let idx = 0;
const rotatingSpan = document.getElementById('rotatingTag');
if (rotatingSpan) {
  setInterval(() => {
    rotatingSpan.style.opacity = '0.4';
    rotatingSpan.style.transform = 'translateY(4px)';
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      rotatingSpan.innerText = roles[idx];
      rotatingSpan.style.transition = 'all 0.2s ease';
      rotatingSpan.style.opacity = '1';
      rotatingSpan.style.transform = 'translateY(0)';
    }, 120);
  }, 2500);
}

// ── Scroll Reveal Observer ──
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
reveals.forEach(el => obs.observe(el));

// ── Infinite Marquee (clone once) ──
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack && marqueeTrack.parentNode && !marqueeTrack.dataset.cloned) {
  const clone = marqueeTrack.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  marqueeTrack.parentNode.appendChild(clone);
  marqueeTrack.dataset.cloned = '1';
}

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Parallax Hero (desktop only) ──
if (!isTouchDevice) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.4}px)`;
      hero.style.opacity = Math.max(0, 1 - scrolled * 0.002);
    }
  });
}

// ── Dynamic Year ──
const footerYear = document.querySelector('footer p');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace('2025', new Date().getFullYear());
}
