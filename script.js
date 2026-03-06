const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
const nav = document.getElementById('nav');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

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

document.querySelectorAll('a, button, .skill-list li').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('hover');
    cursorRing?.classList.add('hover');
  });

  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('hover');
    cursorRing?.classList.remove('hover');
  });
});

window.addEventListener(
  'scroll',
  () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  },
  { passive: true }
);

const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        if (!parent) return;

        const siblings = [...parent.querySelectorAll('.reveal, .reveal-left, .reveal-scale')];
        const idx = siblings.indexOf(entry.target);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

revealEls.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          a.style.color =
            a.getAttribute('href') === `#${entry.target.id}` ? 'var(--accent)' : '';
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => sectionObserver.observe(section));