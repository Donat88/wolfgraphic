try {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 5 },
        image: { src: 'img/github.svg', width: 100, height: 100 }
      },
      opacity: { value: 0.5, random: false },
      size: { value: 5, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        out_mode: 'out'
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2 },
        repulse: { distance: 200 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
} catch (e) {
  console.warn('particlesJS hiba:', e);
}

document.addEventListener('DOMContentLoaded', () => {
  const headerHeight = 60;  
  const hamburger    = document.querySelector('.hamburger');
  const mobileMenu   = document.querySelector('.nav-list ul');
  const navLinks     = document.querySelectorAll('.nav-list ul li a');
  const sections     = document.querySelectorAll('section[id]');

 
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  function onScroll() {
    const scrollPos = window.pageYOffset + headerHeight + 5;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id     = sec.id;
      const a      = document.querySelector(`.nav-list ul li a[href="#${id}"]`);
      if (!a) return;
      if (scrollPos >= top && scrollPos < bottom) {
        a.classList.add('active-link');
      } else {
        a.classList.remove('active-link');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
});