document.addEventListener('DOMContentLoaded', function() {
  // EmailJS
  emailjs.init('YOUR_USER_ID');

  // Navigation Active State & Hover Effects
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Remove active class from all links
  function removeActiveClass() {
    navLinks.forEach(link => link.classList.remove('active'));
  }

  // Add active class to clicked link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      removeActiveClass();
      this.classList.add('active');
    });
  });

  // Active link on scroll (highlight current section)
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255,255,255,0.98)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
      navbar.style.padding = '0.75rem 0';
    } else {
      navbar.style.background = 'rgba(255,255,255,0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
      navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      navbar.style.padding = '1rem 0';
    }
  });

  // Pricing toggle
  const switcherLabels = document.querySelectorAll('.switcher-label');
  const pricingPrices = document.querySelectorAll('.pricing-price');
  
  switcherLabels.forEach(label => {
    label.addEventListener('click', () => {
      const plan = label.dataset.plan;
      
      switcherLabels.forEach(l => l.classList.remove('active'));
      label.classList.add('active');
      
      pricingPrices.forEach(price => {
        const monthly = price.dataset.monthly;
        const yearly = price.dataset.yearly;
        price.querySelector('.price').textContent = plan === 'monthly' ? monthly : yearly;
      });
    });
  });

  // Stats animation
  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.dataset.target || stat.textContent);
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
      }, 25);
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        
        if (entry.target.closest('.hero-stats')) {
          animateStats();
        }
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });

  // Form validation & submission
  const form = document.getElementById('contact-form');
  if (form) {
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
      input.addEventListener('input', validateForm);
    });

    function validateForm() {
      const allValid = Array.from(inputs).every(input => input.value.trim().length > 0);
      form.querySelector('.form-submit').disabled = !allValid;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.form-submit');
      const btnText = submitBtn.querySelector('.btn-text');
      const loader = submitBtn.querySelector('.btn-loader');
      
      submitBtn.disabled = true;
      btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
      loader.style.display = 'inline-block';
      
      // Simulate API call
      setTimeout(() => {
        alert('🎉 Free trial activated! Check your email for instant access.');
        form.reset();
        submitBtn.disabled = false;
        btnText.innerHTML = '<i class="fas fa-rocket"></i> Start 14-Day Free Trial';
        loader.style.display = 'none';
      }, 2000);
    });
  }

  // Parallax effect on hero mockup
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const mockup = document.querySelector('.mockup-img');
    if (mockup) {
      mockup.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Set initial active nav (Home)
  setTimeout(() => {
    navLinks[0].classList.add('active');
  }, 100);
});
