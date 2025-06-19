// Professional Skincare Website - JavaScript
// Competition Entry with Advanced Features

// ============================================================================
// INITIALIZATION AND DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoader();
    initThemeToggle();
    initNavigation();
    initProductFilters();
    initReviewsCarousel();
    initScrollEffects();
    initCartFunctionality();
    initFormHandlers();
    initAnimations();
    initWishlist();
    initSearch();
    initBackToTop();
    
    console.log('🎨 GlowSkin Website Initialized Successfully!');
});

// ============================================================================
// LOADER FUNCTIONALITY
// ============================================================================

function initLoader() {
    const loader = document.getElementById('loader');
    
    // Simulate loading time (2-3 seconds)
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (loader) {
                loader.remove();
            }
        }, 500);
        
        // Trigger entrance animations
        triggerEntranceAnimations();
    }, 2500);
}

function triggerEntranceAnimations() {
    const elements = document.querySelectorAll('.hero-content, .hero-image');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
}

// ============================================================================
// THEME TOGGLE (LIGHT/DARK MODE)
// ============================================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = getFromMemory('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        saveToMemory('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ============================================================================
// NAVIGATION FUNCTIONALITY
// ============================================================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    hamburger?.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu?.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu?.classList.contains('active')) {
                    hamburger?.click();
                }
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Auto-hide header on scroll down
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================================================
// PRODUCT FILTERS
// ============================================================================

function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================================================
// REVIEWS CAROUSEL
// ============================================================================

function initReviewsCarousel() {
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');
    
    if (reviewCards.length === 0) return;
    
    let currentReview = 0;
    
    function showReview(index) {
        reviewCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextReview() {
        currentReview = (currentReview + 1) % reviewCards.length;
        showReview(currentReview);
    }
    
    function prevReview() {
        currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
        showReview(currentReview);
    }
    
    // Event listeners
    nextBtn?.addEventListener('click', nextReview);
    prevBtn?.addEventListener('click', prevReview);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentReview = index;
            showReview(currentReview);
        });
    });
    
    // Auto-play
    setInterval(nextReview, 5000);
    
    // Initialize first review
    showReview(0);
}

// ============================================================================
// SCROLL EFFECTS
// ============================================================================

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll(
        '.product-card, .ingredient-card, .step, .section-header'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// ============================================================================
// CART FUNCTIONALITY
// ============================================================================

let cartItems = [];
let cartCount = 0;

function initCartFunctionality() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.querySelector('.cart-count');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-id') || Date.now().toString();
            const productName = productCard.querySelector('.product-name')?.textContent || 'Product';
            const productPrice = productCard.querySelector('.current-price')?.textContent || '$0';
            const productImage = productCard.querySelector('.product-image')?.style.backgroundImage || '';
            
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            
            addToCart(product);
            showCartNotification(productName);
            
            // Button animation
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
    
    // Update cart count display
    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
        }
    }
    
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push(product);
        }
        
        cartCount++;
        updateCartCount();
        saveToMemory('cartItems', cartItems);
        saveToMemory('cartCount', cartCount);
    }
    
    function showCartNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: -300px;
            background: #4CAF50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(-320px)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Load saved cart data
    const savedItems = getFromMemory('cartItems');
    const savedCount = getFromMemory('cartCount');
    
    if (savedItems) {
        cartItems = savedItems;
    }
    if (savedCount) {
        cartCount = parseInt(savedCount);
        updateCartCount();
    }
}

// ============================================================================
// WISHLIST FUNCTIONALITY
// ============================================================================

let wishlistItems = [];

function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-id') || Date.now().toString();
            const isWishlisted = this.classList.contains('wishlisted');
            
            if (isWishlisted) {
                removeFromWishlist(productId);
                this.classList.remove('wishlisted');
                this.innerHTML = '<i class="far fa-heart"></i>';
            } else {
                addToWishlist(productId);
                this.classList.add('wishlisted');
                this.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    });
    
    function addToWishlist(productId) {
        if (!wishlistItems.includes(productId)) {
            wishlistItems.push(productId);
            saveToMemory('wishlistItems', wishlistItems);
        }
    }
    
    function removeFromWishlist(productId) {
        wishlistItems = wishlistItems.filter(id => id !== productId);
        saveToMemory('wishlistItems', wishlistItems);
    }
    
    // Load saved wishlist
    const savedWishlist = getFromMemory('wishlistItems');
    if (savedWishlist) {
        wishlistItems = savedWishlist;
        
        // Update UI
        wishlistItems.forEach(productId => {
            const productCard = document.querySelector(`[data-id="${productId}"]`);
            const wishlistBtn = productCard?.querySelector('.wishlist-btn');
            if (wishlistBtn) {
                wishlistBtn.classList.add('wishlisted');
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    }
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = createSearchModal();
    
    searchBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.appendChild(searchModal);
        searchModal.style.display = 'flex';
        searchModal.querySelector('.search-input')?.focus();
    });
}

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div class="search-container" style="
            background: var(--background-color);
            padding: 2rem;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            position: relative;
        ">
            <button class="search-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-primary);
            ">&times;</button>
            <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Search Products</h3>
            <input type="text" class="search-input" placeholder="Search skincare products..." style="
                width: 100%;
                padding: 12px 16px;
                border: 2px solid var(--border-color);
                border-radius: 8px;
                font-size: 1rem;
                margin-bottom: 1rem;
                background: var(--background-color);
                color: var(--text-primary);
            ">
            <div class="search-results" style="
                max-height: 300px;
                overflow-y: auto;
            "></div>
        </div>
    `;
    
    // Event listeners
    modal.querySelector('.search-close').addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });
    
    const searchInput = modal.querySelector('.search-input');
    const searchResults = modal.querySelector('.search-results');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length > 2) {
            performSearch(query, searchResults);
        } else {
            searchResults.innerHTML = '';
        }
    });
    
    return modal;
}

function performSearch(query, resultsContainer) {
    const products = document.querySelectorAll('.product-card');
    const matches = [];
    
    products.forEach(product => {
        const name = product.querySelector('.product-name')?.textContent.toLowerCase();
        const description = product.querySelector('.product-description')?.textContent.toLowerCase();
        
        if (name?.includes(query) || description?.includes(query)) {
            matches.push({
                name: product.querySelector('.product-name')?.textContent,
                description: product.querySelector('.product-description')?.textContent,
                price: product.querySelector('.current-price')?.textContent,
                element: product
            });
        }
    });
    
    if (matches.length > 0) {
        resultsContainer.innerHTML = matches.map(match => `
            <div class="search-result-item" style="
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: background 0.2s ease;
            " onmouseover="this.style.background='var(--surface-color)'" 
               onmouseout="this.style.background='transparent'"
               onclick="scrollToProduct('${match.element.id || match.name}')">
                <h4 style="margin-bottom: 0.5rem; color: var(--text-primary);">${match.name}</h4>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${match.description}</p>
                <span style="color: var(--primary-color); font-weight: 600;">${match.price}</span>
            </div>
        `).join('');
    } else {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No products found for "${query}"</p>
            </div>
        `;
    }
}

function scrollToProduct(productIdentifier) {
    const product = document.getElementById(productIdentifier) || 
                   document.querySelector(`[data-name="${productIdentifier}"]`);
    
    if (product) {
        product.scrollIntoView({ behavior: 'smooth', block: 'center' });
        product.style.animation = 'pulse 2s ease';
    }
    
    // Close search modal
    document.querySelector('.search-modal')?.remove();
}

// ============================================================================
// FORM HANDLERS
// ============================================================================

function initFormHandlers() {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Contact form
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        showFormSuccess('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
    
    // Newsletter form
    newsletterForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (validateEmail(email)) {
            showFormSuccess('Successfully subscribed to our newsletter!');
            this.reset();
        } else {
            showFormError('Please enter a valid email address.');
        }
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess(message) {
    showNotification(message, 'success');
}

function showFormError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================================================
// ANIMATIONS
// ============================================================================

function initAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Floating animation for cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target || element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ============================================================================
// BACK TO TOP
// ============================================================================

function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        // Create back to top button if it doesn't exist
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(btn);
    }
    
    const btn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================================
// MEMORY STORAGE UTILITIES (REPLACING LOCALSTORAGE)
// ============================================================================

const memoryStorage = {};

function saveToMemory(key, value) {
    memoryStorage[key] = JSON.stringify(value);
}

function getFromMemory(key) {
    const value = memoryStorage[key];
    try {
        return value ? JSON.parse(value) : null;
    } catch (e) {
        return value;
    }
}

function removeFromMemory(key) {
    delete memoryStorage[key];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                totalTime: perfData.loadEventEnd - perfData.fetchStart
            });
        }, 0);
    });
}

// ============================================================================
// INITIALIZATION COMPLETE
// ============================================================================

console.log('✅ GlowSkin Professional Skincare Website - JavaScript Complete!');