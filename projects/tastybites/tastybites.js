// script.js - Professional Interactive Features

class TastyBitesApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('tastybites-cart')) || [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCartDisplay();
        this.hideLoader();
        this.observeScroll();
        this.loadTheme();
        this.animateElements();
    }

    bindEvents() {
        // Mobile menu
        const menuBtn = document.getElementById('menuBtn');
        const nav = document.getElementById('nav');
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
            document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                document.body.style.overflow = '';
            });
        });

        // Navbar scroll effects
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Cart icon click
        document.getElementById('cartIcon').addEventListener('click', () => {
            this.scrollToOrder();
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    hideLoader() {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }

    handleNavbarScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255,255,255,0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255,255,255,0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('tastybites-theme', newTheme);
        
        // Update icon
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('tastybites-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    addToCart(name, price) {
        const item = { name, price, timestamp: Date.now() };
        this.cart.push(item);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${name} added to cart!`);
        
        // Add success animation to button
        const btn = event.target.closest('.add-btn');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    }

    updateCartDisplay() {
        const count = this.cart.length;
        const total = this.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        
        document.getElementById('cartCount').textContent = count;
        document.getElementById('totalPrice').textContent = `$${total}`;
        
        this.updateOrderSummary();
    }

    updateOrderSummary() {
        const summary = document.getElementById('orderSummary');
        const orderBox = document.getElementById('orderBox');
        
        if (this.cart.length === 0) {
            summary.innerHTML = '<p>Your cart is empty. Add some delicious items! 😋</p>';
            orderBox.value = '';
            return;
        }
        
        const itemsList = this.cart.map(item => `${item.name} ($${item.price.toFixed(2)})`).join('\n');
        const total = this.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        
        summary.innerHTML = `
            <div style="text-align: left;">
                <h3>🛒 Your Cart (${this.cart.length} items)</h3>
                <div style="margin: 1rem 0; max-height: 200px; overflow-y: auto;">
                    ${itemsList}
                </div>
            </div>
        `;
        
        orderBox.value = `🍽️ TastyBites Order\n\n${itemsList}\n\n💰 Total: $${total}\n\n📱 Please confirm your order details.`;
    }

    clearCart() {
        if (confirm('Clear all items from cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    sendWhatsApp() {
        if (this.cart.length === 0) {
            alert('Your cart is empty! Add some items first.');
            return;
        }
        
        const message = document.getElementById('orderBox').value;
        const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    scrollToOrder() {
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    }

    scrollToMenu() {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }

    saveCart() {
        localStorage.setItem('tastybites-cart', JSON.stringify(this.cart));
    }

    showNotification(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    observeScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveNavLink(entry.target.id);
                }
            });
        }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    setActiveNavLink(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    animateElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        });

        document.querySelectorAll('.card, .feature-card, .review-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Global functions for onclick handlers
function addToCart(name, price) {
    app.addToCart(name, price);
}

function scrollToOrder() {
    app.scrollToOrder();
}

function scrollToMenu() {
    app.scrollToMenu();
}

function sendWhatsApp() {
    app.sendWhatsApp();
}

function clearCart() {
    app.clearCart();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TastyBitesApp();
});

// Add toast styles to CSS (inline for demo)
const toastStyle = `
.toast {
    position: fixed;
    top: 100px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(16,185,129,0.4);
    transform: translateX(400px);
    opacity: 0;
    z-index: 10000;
    font-weight: 500;
    transition: all 0.3s ease;
}

.toast.show {
    transform: translateX(0);
    opacity: 1;
}
`;

const style = document.createElement('style');
style.textContent = toastStyle;
document.head.appendChild(style);
