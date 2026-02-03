document.addEventListener('DOMContentLoaded', function() {

  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navList.classList.remove('active');
      }
    });
  });

  // Navbar active
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  });

  // Project filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach((card, index) => {
        if (filter === 'all' || card.dataset.category === filter) {
          setTimeout(() => card.classList.add('animate'), index * 100);
        } else {
          card.classList.remove('animate');
        }
      });
    });
  });

  // 🔹 AUTO LOAD ALL PROJECTS
  const defaultBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (defaultBtn) defaultBtn.click();

  // Stats counter (RUN ONCE)
  let statsPlayed = false;

  function animateStats() {
    if (statsPlayed) return;
    statsPlayed = true;

    const stats = document.querySelectorAll('.stat-number[data-target]');
    stats.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      let current = 0;
      const increment = target / 100;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 30);
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateStats();
    });
  });

  observer.observe(document.querySelector('.hero-stats'));

  // Form handling
  const form = document.getElementById('contact-form');
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('input', function() {
      const allFilled = Array.from(inputs).every(i => i.value.trim());
      form.querySelector('.form-submit').disabled = !allFilled;
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const btnText = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.btn-loader');

    btn.disabled = true;
    btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    loader.style.display = 'inline-block';

    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
      alert('✅ Message sent successfully!');
      form.reset();
    } catch (error) {
      alert('❌ Please email directly: sarah@example.com');
    } finally {
      btn.disabled = false;
      btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      loader.style.display = 'none';
    }
  });

});
