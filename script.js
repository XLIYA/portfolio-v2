const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
const nav = document.getElementById('nav');
const scrollProgress = document.getElementById('scrollProgress');
const year = document.getElementById('year');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canUseCustomCursor =
  window.matchMedia('(pointer: fine) and (hover: hover)').matches && !prefersReducedMotion;

if (year) {
  year.textContent = new Date().getFullYear();
}

function updateScrollUi() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  nav?.classList.toggle('scrolled', window.scrollY > 60);

  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  }
}

window.addEventListener('scroll', updateScrollUi, { passive: true });
window.addEventListener('resize', updateScrollUi);
updateScrollUi();

if (canUseCustomCursor) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll('a, button, .skill-list li').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor?.classList.add('hover');
      cursorRing?.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
      cursor?.classList.remove('hover');
      cursorRing?.classList.remove('hover');
    });
  });
} else {
  cursor?.remove();
  cursorRing?.remove();
}

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const parent = entry.target.parentElement;
        if (!parent) return;

        const siblings = [...parent.querySelectorAll('.reveal, .reveal-left, .reveal-scale')];
        const index = siblings.indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.max(index, 0) * 80);

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealEls.forEach((element) => observer.observe(element));
} else {
  revealEls.forEach((element) => element.classList.add('visible'));
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    {
      threshold: 0.35,
      rootMargin: '-10% 0px -45% 0px',
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
