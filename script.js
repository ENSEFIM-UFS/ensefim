const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const scrollSpyLinks = navLinks.filter((link) => link.getAttribute('href')?.startsWith('#'));

const updateActiveLink = () => {
  if (sections.length === 0 || scrollSpyLinks.length === 0) return;
  const scrollPosition = window.scrollY + 140;
  let activeId = 'inicio';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) activeId = section.id;
  });

  scrollSpyLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
