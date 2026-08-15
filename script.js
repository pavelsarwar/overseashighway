document.getElementById('year').textContent = new Date().getFullYear();

const destinationSelect = document.getElementById('destinationSelect');
const serviceSelect = document.getElementById('serviceSelect');
const exploreBtn = document.getElementById('exploreBtn');

if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    const destination = destinationSelect?.value || '';
    const service = serviceSelect?.value || '';
    if (!destination && !service) {
      document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const target = destination === 'malaysia' ? 'malaysia.html' : service ? `${service}.html` : 'destinations.html';
    window.location.href = target;
  });
}

const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

const form = document.querySelector('.consult-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || '';
    const service = form.querySelector('[name="service"]')?.value || 'general enquiry';
    const msg = `Hello Overseas Highway, I am ${name}. I would like to discuss ${service}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  });
}
