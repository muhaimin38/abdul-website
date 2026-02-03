document.addEventListener('DOMContentLoaded', function() {


  // 🌐 Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      }
    });
  });

  // 📱 Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    navList.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', navList.classList.contains('active'));
    
    const spans = menuToggle.querySelectorAll('span');
    if (navList.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    }
  }

  function closeMobileMenu() {
    navList.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transform = '';
      span.style.opacity = '';
    });
  }

  // 🎯 Active Nav Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    let current = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
    setTimeout(() => ticking = false, 50);
  });
  updateActiveNav();

  // ✉️ Form Validation & EmailJS
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', validateField);
    });

    function validateField(e) {
      const field = e.target;
      const errorMsg = field.parentNode.querySelector('.error-message');
      const value = field.value.trim();
      
      field.classList.remove('error', 'success');
      errorMsg.textContent = '';
      
      let isValid = true;
      
      if (!value) {
        showError(field, errorMsg, `${field.previousElementSibling?.textContent || 'This field'} is required`);
        isValid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(field, errorMsg, 'Please enter a valid email');
        isValid = false;
      }
      
      if (isValid) field.classList.add('success');
    }

    function showError(field, errorMsg, message) {
      field.classList.add('error');
      errorMsg.textContent = message;
    }

    contactForm.addEventListener('input', function() {
      const submitBtn = this.querySelector('.form-submit');
      const allValid = Array.from(inputs).every(input => {
        const value = input.value.trim();
        return value && (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      });
      submitBtn.disabled = !allValid;
    });


  // ✨ Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.service-card, .project-card, .about-bio').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // 🎨 Micro-interactions
  document.querySelectorAll('.btn, .service-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    el.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // 📊 Stats Counter Animation
  function animateStats() {
    const stats = document.querySelectorAll('.stat-numbe');
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      const increment = target / 100;
      let current = 0;
      
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

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateStats();
    });
  });
  heroObserver.observe(document.querySelector('.hero-stats'));

 // Email integration 
 
  // ✉️ EMAILJS WORKING SETUP
emailjs.init("96XNtefIqj8_yyIBd");

const form = document.getElementById('contact-form');
const submitBtn = document.querySelector('.form-submit');
const btnText = submitBtn.querySelector('.btn-text');
const loader = document.querySelector('.btn-loader');

function checkForm() {
  const allValid = Array.from(form.querySelectorAll('[required]')).every(field =>
    field.value.trim() && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value))
  );
  submitBtn.disabled = !allValid;
}

form.querySelectorAll('[required]').forEach(input => {
  input.addEventListener('input', checkForm);
});

checkForm();

// SINGLE SUBMIT HANDLER
form.addEventListener('submit', function(e) {
  e.preventDefault();

  submitBtn.disabled = true;
  btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  loader.style.display = 'inline-block';

  emailjs.sendForm('service_7bsrlk2', 'template_6la2w8u', form)
 .then(() => {
  // Show non-blocking success message
  const msg = document.createElement("div");
  msg.className = "success-toast";
  msg.innerText = "✅ Message sent successfully!";
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);

  form.reset();
  checkForm();
})

    .catch((error) => {
      console.error(error);
      alert('❌ Failed to send. Check EmailJS settings.');
    })
    .finally(() => {
      btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      loader.style.display = 'none';
    });
});

  }
  });

