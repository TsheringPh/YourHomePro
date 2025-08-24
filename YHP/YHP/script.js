// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('YourHomePro script loaded successfully');

    // Provider database - in a real app, this would come from a backend
    window.providers = {};
    window.booking = null;
    window.selectedProvider = null;
    window.selectedPaymentMethod = null;

    // Initialize providers
    window.providers = {
        'Handyman': [
            { id: 1, name: 'Mike Johnson', email: 'mike.johnson@yourhomepro.com', rating: 4.8, experience: '5+ years', hourlyRate: 40, location: 'Sydney, NSW' },
            { id: 2, name: 'David Chen', email: 'david.chen@yourhomepro.com', rating: 4.9, experience: '8+ years', hourlyRate: 45, location: 'Sydney, NSW' },
            { id: 3, name: 'Tom Wilson', email: 'tom.wilson@yourhomepro.com', rating: 4.7, experience: '3+ years', hourlyRate: 38, location: 'Sydney, NSW' }
        ],
        'Painting': [
            { id: 4, name: 'Sarah Martinez', email: 'sarah.martinez@yourhomepro.com', rating: 4.9, experience: '6+ years', hourlyRate: 45, location: 'Sydney, NSW' },
            { id: 5, name: 'James Brown', email: 'james.brown@yourhomepro.com', rating: 4.8, experience: '10+ years', hourlyRate: 50, location: 'Sydney, NSW' },
            { id: 6, name: 'Lisa Davis', email: 'lisa.davis@yourhomepro.com', rating: 4.6, experience: '4+ years', hourlyRate: 42, location: 'Sydney, NSW' }
        ],
        'Cleaning': [
            { id: 7, name: 'Emma Thompson', email: 'emma.thompson@yourhomepro.com', rating: 4.7, experience: '3+ years', hourlyRate: 35, location: 'Sydney, NSW' },
            { id: 8, name: 'Robert Garcia', email: 'robert.garcia@yourhomepro.com', rating: 4.8, experience: '7+ years', hourlyRate: 38, location: 'Sydney, NSW' },
            { id: 9, name: 'Maria Rodriguez', email: 'maria.rodriguez@yourhomepro.com', rating: 4.9, experience: '5+ years', hourlyRate: 36, location: 'Sydney, NSW' }
        ],
        'Electrical': [
            { id: 10, name: 'Kevin Lee', email: 'kevin.lee@yourhomepro.com', rating: 4.9, experience: '12+ years', hourlyRate: 50, location: 'Sydney, NSW' },
            { id: 11, name: 'Amanda White', email: 'amanda.white@yourhomepro.com', rating: 4.8, experience: '6+ years', hourlyRate: 48, location: 'Sydney, NSW' },
            { id: 12, name: 'Chris Anderson', email: 'chris.anderson@yourhomepro.com', rating: 4.7, experience: '4+ years', hourlyRate: 45, location: 'Sydney, NSW' }
        ],
        'Plumbing': [
            { id: 13, name: 'Mark Taylor', email: 'mark.taylor@yourhomepro.com', rating: 4.8, experience: '9+ years', hourlyRate: 45, location: 'Sydney, NSW' },
            { id: 14, name: 'Jennifer Clark', email: 'jennifer.clark@yourhomepro.com', rating: 4.9, experience: '7+ years', hourlyRate: 47, location: 'Sydney, NSW' },
            { id: 15, name: 'Ryan Moore', email: 'ryan.moore@yourhomepro.com', rating: 4.6, experience: '5+ years', hourlyRate: 43, location: 'Sydney, NSW' }
        ]
    };

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinksList = document.querySelectorAll('.nav-links a');

    navLinksList.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinksList.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Get the target section ID
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';

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
    }

    // Add scroll event listener for active navigation
    window.addEventListener('scroll', updateActiveNavLink);

    // Search functionality
    const searchInput = document.querySelector('#searchInput');
    const searchDropdown = document.querySelector('#searchDropdown');
    const searchResults = document.querySelector('#searchResults');
    const suggestionItems = document.querySelectorAll('.suggestion-item');
    const resultItems = document.querySelectorAll('.result-item');

    if (searchInput) {
        // Show dropdown on focus
        searchInput.addEventListener('focus', function () {
            searchDropdown.classList.add('active');
            // Trigger smooth animation
            setTimeout(() => {
                searchDropdown.style.opacity = '1';
                searchDropdown.style.transform = 'translateY(0)';
            }, 10);
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('active');
                // Smooth hide animation
                searchDropdown.style.opacity = '0';
                searchDropdown.style.transform = 'translateY(-10px)';
            }
        });

        // Handle search input
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            if (query.length > 0) {
                // Show search results
                searchResults.style.display = 'block';
                document.querySelector('.search-suggestions').style.display = 'none';

                // Filter results based on query
                let visibleResults = 0;
                resultItems.forEach(item => {
                    const title = item.querySelector('.result-title').textContent.toLowerCase();
                    const subtitle = item.querySelector('.result-subtitle').textContent.toLowerCase();
                    const icon = item.querySelector('i').className;

                    // Enhanced search matching
                    let isMatch = false;

                    // Direct text matching
                    if (title.includes(query) || subtitle.includes(query)) {
                        isMatch = true;
                    }

                    // Service type matching based on icons
                    if (query.includes('handyman') && icon.includes('fa-tools')) {
                        isMatch = true;
                    } else if (query.includes('painting') && icon.includes('fa-paint-brush')) {
                        isMatch = true;
                    } else if (query.includes('cleaning') && icon.includes('fa-broom')) {
                        isMatch = true;
                    } else if (query.includes('electrical') && icon.includes('fa-bolt')) {
                        isMatch = true;
                    } else if (query.includes('plumbing') && icon.includes('fa-faucet')) {
                        isMatch = true;
                    }

                    // Location matching
                    if (query.includes('sydney') || query.includes('melbourne') ||
                        query.includes('brisbane') || query.includes('perth') ||
                        query.includes('adelaide') || query.includes('nsw') ||
                        query.includes('vic') || query.includes('qld') ||
                        query.includes('wa') || query.includes('sa')) {
                        if (subtitle.includes(query)) {
                            isMatch = true;
                        }
                    }

                    if (isMatch) {
                        item.style.display = 'flex';
                        visibleResults++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update results count
                const resultsCountElement = document.querySelector('#resultsCount');
                if (resultsCountElement) {
                    resultsCountElement.textContent = visibleResults;
                }

                // Show/hide "No matches found" message
                const noResults = document.querySelector('#noResults');
                if (visibleResults === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            } else {
                // Show suggestions when input is empty
                searchResults.style.display = 'none';
                document.querySelector('.search-suggestions').style.display = 'block';

                // Highlight suggestions that match the input
                suggestionItems.forEach(item => {
                    const suggestionText = item.querySelector('span').textContent.toLowerCase();
                    if (query.length > 0 && suggestionText.includes(query)) {
                        item.classList.add('highlighted');
                    } else {
                        item.classList.remove('highlighted');
                    }
                });
            }
        });

        // Handle suggestion clicks
        suggestionItems.forEach(item => {
            item.addEventListener('click', function () {
                const service = this.querySelector('span').textContent;
                searchInput.value = service;

                // Show search results for the selected service
                searchResults.style.display = 'block';
                document.querySelector('.search-suggestions').style.display = 'none';

                // Filter results to show only the selected service type
                const serviceType = service.toLowerCase();
                let visibleResults = 0;

                resultItems.forEach(item => {
                    const title = item.querySelector('.result-title').textContent.toLowerCase();
                    const icon = item.querySelector('i').className;

                    // Check if the result matches the selected service
                    let isMatch = false;
                    if (serviceType.includes('handyman') && icon.includes('fa-tools')) {
                        isMatch = true;
                    } else if (serviceType.includes('painting') && icon.includes('fa-paint-brush')) {
                        isMatch = true;
                    } else if (serviceType.includes('cleaning') && icon.includes('fa-broom')) {
                        isMatch = true;
                    } else if (serviceType.includes('electrical') && icon.includes('fa-bolt')) {
                        isMatch = true;
                    } else if (serviceType.includes('plumbing') && icon.includes('fa-faucet')) {
                        isMatch = true;
                    }

                    if (isMatch) {
                        item.style.display = 'flex';
                        visibleResults++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update results count
                const resultsCountElement = document.querySelector('#resultsCount');
                if (resultsCountElement) {
                    resultsCountElement.textContent = visibleResults;
                }

                // Show/hide "No matches found" message
                const noResults = document.querySelector('#noResults');
                if (visibleResults === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }

                searchDropdown.classList.remove('active');
            });
        });

        // Handle result clicks
        resultItems.forEach(item => {
            item.addEventListener('click', function () {
                const title = this.querySelector('.result-title').textContent;
                const location = this.querySelector('.result-subtitle').textContent;
                alert(`Selected: ${title} in ${location}\n\nThis would navigate to the service provider's profile.`);
                searchDropdown.classList.remove('active');
            });
        });

        // Enter key functionality
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                    // Here you would typically implement actual search functionality
                }
            }
        });
    }

    // Register buttons
    const registerBtn = document.querySelector('.btn-secondary');

    if (registerBtn) {
        registerBtn.addEventListener('click', function () {
            alert('Registration functionality would go here!');
        });
    }

    // Registration form submission
    const registrationForm = document.querySelector('.registration-form form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const category = this.querySelector('select').value;

            if (name && email && phone && category) {
                alert(`Thank you for your application, ${name}!\n\nWe'll review your information and contact you soon.`);
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced partner card functionality
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            // Add subtle glow effect
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.1)';
        });

        // Click functionality to show partner details
        card.addEventListener('click', function () {
            const partnerName = this.querySelector('h3').textContent;
            const partnerRating = this.querySelector('.partner-rating').textContent;
            const partnerDescription = this.querySelector('.partner-description').textContent;

            // Create detailed view modal
            showPartnerModal(partnerName, partnerRating, partnerDescription, this);
        });

        // Add animation to stats on hover
        const stats = card.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });

            stat.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    });

    // Function to show partner details modal
    function showPartnerModal(name, rating, description, cardElement) {
        // Get additional details from the card
        const projects = Array.from(cardElement.querySelectorAll('.partner-projects li')).map(li => li.textContent);

        // Create modal content
        let modalContent = `
            <div class="partner-modal">
                <div class="modal-header">
                    <h2>${name}</h2>
                    <span class="modal-rating">${rating}</span>
                    <button class="modal-close" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="modal-body">
                    <p class="modal-description">${description}</p>
                    <div class="modal-projects">
                        <h3>Recent Projects</h3>
                        <ul>${projects.map(project => `<li>${project}</li>`).join('')}</ul>
                    </div>
                </div>
            </div>
        `;

        // Create and show modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = modalContent;
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.remove();
            }
        });

        document.body.appendChild(modal);

        // Add animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    // Add click effects to team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', function () {
            const name = this.querySelector('h3').textContent;
            const role = this.querySelector('p').textContent;
            alert(`${name} - ${role}\n\nThis would show more details about the team member.`);
        });
    });

    // Social media icon click handlers
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const platforms = ['Twitter', 'YouTube', 'LinkedIn'];
            alert(`This would link to ${platforms[index]}!`);
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Add loading animation to page
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Simple form validation for search
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            if (this.value.length > 0) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = '#ff6b35';
            }
        });
    }

    // Add some interactive elements
    console.log('YourHomePro website loaded successfully! 🏠✨');

    // Optional: Add a simple counter animation
    const ratings = document.querySelectorAll('.rating, .partner-rating');
    ratings.forEach(rating => {
        const originalText = rating.textContent;
        rating.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
            this.style.color = '#e55a2b';
        });

        rating.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.color = '#ff6b35';
        });
    });

    // Add smooth reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Initialize first section as visible
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const firstName = this.querySelector('#firstName').value.trim();
            const lastName = this.querySelector('#lastName').value.trim();
            const email = this.querySelector('#email').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value.trim();

            // Basic validation
            if (!firstName || !lastName || !email || !phone || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Show success message
            alert(`Thank you for your message, ${firstName}!\n\nWe've received your inquiry about "${subject}" and will respond to you at ${email} within 24 hours.\n\nYour message:\n"${message}"`);

            // Reset form
            this.reset();

            // Add success animation
            const submitBtn = this.querySelector('.contact-submit');
            submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
            submitBtn.style.background = '#4CAF50';

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Message</span><div class="btn-icon">📤</div>';
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // Add focus effects to contact form inputs
    const contactInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    contactInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Add hover effects to contact info items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Social media links in contact section
    const contactSocialLinks = document.querySelectorAll('.social-link');
    contactSocialLinks.forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const platforms = ['Twitter', 'Facebook', 'LinkedIn', 'Instagram'];
            alert(`This would link to ${platforms[index]}!`);
        });
    });

    // Initialize Testimonials Swiper
    const testimonialsSwiper = new Swiper('.swiper-container', {
        // Basic settings
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            },
        },

        // Effects
        effect: 'slide',
        speed: 600,

        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous testimonial',
            nextSlideMessage: 'Next testimonial',
            firstSlideMessage: 'This is the first testimonial',
            lastSlideMessage: 'This is the last testimonial',
        },

        // Touch and mouse
        grabCursor: true,
        mousewheel: false,

        // Height management
        autoHeight: false,
        height: 380,

        // Update on resize
        on: {
            resize: function () {
                this.update();
            },
            breakpoint: function (swiper, breakpoint) {
                console.log('Breakpoint changed to:', breakpoint);
            },
            init: function () {
                this.update();
            }
        }
    });

    // Pause autoplay on hover
    const testimonialsContainer = document.querySelector('.swiper-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            testimonialsSwiper.autoplay.stop();
        });

        testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialsSwiper.autoplay.start();
        });
    }

    // Back to Top Button functionality
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show button after scrolling past hero section
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const heroSection = document.querySelector('.hero');

            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;

                // Show button when user scrolls past the hero section
                if (scrollTop > heroHeight) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Hide button after clicking
            setTimeout(() => {
                backToTopBtn.classList.remove('show');
            }, 500);
        });
    }
});

// Service Booking Function
function bookService(serviceName, basePrice) {
    // Get available providers for this service
    const availableProviders = window.providers[serviceName] || [];

    // Create a modal for booking
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="booking-modal-content">
            <div class="booking-modal-header">
                <h3>Book ${serviceName} Service</h3>
                <button class="close-modal" onclick="closeBookingModal()">&times;</button>
            </div>
            <div class="booking-modal-body">
                <form id="bookingForm">
                    <div class="form-group">
                        <label for="customerName">Full Name <span>*</span></label>
                        <input type="text" id="customerName" required>
                    </div>
                    <div class="form-group">
                        <label for="customerEmail">Email <span>*</span></label>
                        <input type="email" id="customerEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="customerPhone">Phone <span>*</span></label>
                        <input type="tel" id="customerPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="providerSelect">Select Provider <span>*</span></label>
                        <select id="providerSelect" required onchange="updateProviderDetails()">
                            <option value="">Choose a provider...</option>
                            ${availableProviders.map(provider => `
                                <option value="${provider.id}" data-rate="${provider.hourlyRate}" data-email="${provider.email}" data-name="${provider.name}">
                                    ${provider.name} - ${provider.rating}★ (${provider.experience}) - $${provider.hourlyRate}/hr
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="provider-details" id="providerDetails" style="display: none;">
                        <div class="provider-info">
                            <h4>Provider Information</h4>
                            <p><strong>Name:</strong> <span id="selectedProviderName"></span></p>
                            <p><strong>Rating:</strong> <span id="selectedProviderRating"></span></p>
                            <p><strong>Experience:</strong> <span id="selectedProviderExperience"></span></p>
                            <p><strong>Location:</strong> <span id="selectedProviderLocation"></span></p>
                            <p><strong>Hourly Rate:</strong> <span id="selectedProviderRate"></span></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serviceDate">Preferred Date <span>*</span></label>
                        <input type="date" id="serviceDate" required>
                    </div>
                    <div class="form-group">
                        <label for="serviceTime">Preferred Time <span>*</span></label>
                        <select id="serviceTime" required>
                            <option value="">Select Time</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="serviceHours">Estimated Hours <span>*</span></label>
                        <input type="number" id="serviceHours" min="1" max="8" value="2" required>
                    </div>
                    <div class="form-group">
                        <label for="serviceAddress">Service Address <span>*</span></label>
                        <textarea id="serviceAddress" rows="3" required placeholder="Enter your full address"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="customerDescription">Service Description</label>
                        <textarea id="customerDescription" rows="3" placeholder="Describe what you need (optional)"></textarea>
                    </div>
                    <div class="price-summary">
                        <h4>Price Summary</h4>
                        <div class="price-breakdown">
                            <span>Provider Rate:</span>
                            <span id="basePrice">Select a provider</span>
                        </div>
                        <div class="price-breakdown">
                            <span>Estimated Hours:</span>
                            <span id="estimatedHours">2</span>
                        </div>
                        <div class="price-breakdown total">
                            <span>Total Estimated Cost:</span>
                            <span id="totalCost">Select a provider</span>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeBookingModal()">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitBookingForm()" id="proceedBtn" disabled>Proceed to Payment</button>
                    </div>
                </form>
            </div>
            
            <!-- Payment Section -->
            <div class="payment-section" id="paymentSection" style="display: none;">
                <h3>Payment Details</h3>
                <div class="payment-methods">
                    <h4>Select Payment Method</h4>
                    <div class="payment-options">
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="creditCard" checked>
                            <span class="payment-icon"><i class="fas fa-credit-card"></i></span>
                            <span class="payment-text">Credit/Debit Card</span>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="paypal">
                            <span class="payment-icon"><i class="fab fa-paypal"></i></span>
                            <span class="payment-text">PayPal</span>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="bankTransfer">
                            <span class="payment-icon"><i class="fas fa-university"></i></span>
                            <span class="payment-text">Bank Transfer</span>
                        </label>
                    </div>
                </div>
                
                <!-- Credit Card Form -->
                <div class="payment-form" id="creditCardForm">
                    <div class="form-group">
                        <label for="cardNumber">Card Number <span>*</span></label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="card-details">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date <span>*</span></label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV <span>*</span></label>
                            <input type="text" id="cvv" placeholder="123" maxlength="4">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cardholderName">Cardholder Name <span>*</span></label>
                        <input type="text" id="cardholderName" placeholder="As shown on card">
                    </div>
                </div>
                
                <!-- PayPal Form -->
                <div class="payment-form" id="paypalForm" style="display: none;">
                    <div class="paypal-info">
                        <i class="fab fa-paypal"></i>
                        <p>You will be redirected to PayPal to complete your payment securely.</p>
                        <p class="paypal-note">PayPal account not required - you can pay with any credit/debit card.</p>
                    </div>
                </div>
                
                <!-- Bank Transfer Form -->
                <div class="payment-form" id="bankTransferForm" style="display: none;">
                    <div class="bank-info">
                        <h4>Bank Transfer Details</h4>
                        <div class="bank-details">
                            <p><strong>Bank:</strong> Commonwealth Bank</p>
                            <p><strong>Account Name:</strong> YourHomePro Services Pty Ltd</p>
                            <p><strong>BSB:</strong> 062-000</p>
                            <p><strong>Account Number:</strong> 1234 5678</p>
                            <p><strong>Reference:</strong> <span id="bankReference"></span></p>
                        </div>
                        <p class="bank-note">Please include the reference number when making your transfer. Payment confirmation may take 1-2 business days.</p>
                    </div>
                </div>
                
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="goBackToForm()">Back to Form</button>
                    <button type="button" class="btn btn-primary" onclick="processPayment()">Complete Payment</button>
                </div>
            </div>
        </div>
    </div>
    `;

    // Add modal to body
    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Add event listeners
    const serviceHoursInput = document.getElementById('serviceHours');
    const estimatedHoursSpan = document.getElementById('estimatedHours');

    // Update price when hours change
    serviceHoursInput.addEventListener('input', function () {
        const hours = parseInt(this.value) || 0;
        estimatedHoursSpan.textContent = hours;
        updateTotalCost();
    });
}

// Submit booking form and collect data
function submitBookingForm() {
    // Get the current service name from the modal
    const modalTitle = document.querySelector('.booking-modal-header h3');
    const serviceName = modalTitle ? modalTitle.textContent.replace('Book ', '').replace(' Service', '') : '';

    // Collect form data
    const formData = {
        serviceName: serviceName,
        providerId: document.getElementById('providerSelect').value,
        providerName: window.selectedProvider ? window.selectedProvider.name : '',
        providerEmail: window.selectedProvider ? window.selectedProvider.email : '',
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('customerEmail').value,
        customerPhone: document.getElementById('customerPhone').value,
        serviceDate: document.getElementById('serviceDate').value,
        serviceTime: document.getElementById('serviceTime').value,
        serviceHours: document.getElementById('serviceHours').value,
        serviceAddress: document.getElementById('serviceAddress').value,
        customerDescription: document.getElementById('customerDescription').value,
        totalCost: parseInt(document.getElementById('serviceHours').value) * (window.selectedProvider ? window.selectedProvider.hourlyRate : 0)
    };

    // Store form data for payment section
    window.booking = formData;

    // Debug log
    console.log('Form data collected:', formData);
    console.log('Stored in window.booking:', window.booking);

    // Show payment section
    showPaymentSection();
}

// Update provider details when selected
function updateProviderDetails() {
    const providerSelect = document.getElementById('providerSelect');
    const providerDetails = document.getElementById('providerDetails');
    const proceedBtn = document.getElementById('proceedBtn');

    if (providerSelect.value) {
        const selectedOption = providerSelect.options[providerSelect.selectedIndex];
        const providerRate = parseFloat(selectedOption.dataset.rate);
        const providerEmail = selectedOption.dataset.email;
        const providerName = selectedOption.dataset.name;

        // Find the full provider object
        const serviceName = getCurrentServiceName();
        const providers = window.providers[serviceName] || [];
        const provider = providers.find(p => p.id == providerSelect.value);

        if (provider) {
            // Show provider details
            document.getElementById('selectedProviderName').textContent = provider.name;
            document.getElementById('selectedProviderRating').textContent = provider.rating + '★';
            document.getElementById('selectedProviderExperience').textContent = provider.experience;
            document.getElementById('selectedProviderLocation').textContent = provider.location;
            document.getElementById('selectedProviderRate').textContent = '$' + provider.hourlyRate + '/hr';

            // Update price summary
            document.getElementById('basePrice').textContent = '$' + provider.hourlyRate + '/hr';
            updateTotalCost();

            // Show provider details and enable proceed button
            providerDetails.style.display = 'block';
            proceedBtn.disabled = false;

            // Store selected provider info
            window.selectedProvider = provider;
        }
    } else {
        // Hide provider details and disable proceed button
        providerDetails.style.display = 'none';
        proceedBtn.disabled = true;
        document.getElementById('basePrice').textContent = 'Select a provider';
        document.getElementById('totalCost').textContent = 'Select a provider';
    }
}

// Update total cost based on selected provider and hours
function updateTotalCost() {
    const providerSelect = document.getElementById('providerSelect');
    const serviceHours = document.getElementById('serviceHours');

    if (providerSelect.value && serviceHours.value) {
        const selectedOption = providerSelect.options[providerSelect.selectedIndex];
        const providerRate = parseFloat(selectedOption.dataset.rate);
        const hours = parseInt(serviceHours.value) || 0;
        const total = hours * providerRate;

        document.getElementById('totalCost').textContent = '$' + total;
    }
}

// Get current service name from modal title
function getCurrentServiceName() {
    const modalTitle = document.querySelector('.booking-modal-header h3');
    if (modalTitle) {
        const titleText = modalTitle.textContent;
        return titleText.replace('Book ', '').replace(' Service', '');
    }
    return '';
}

// Close booking modal
function closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Show booking success message
function showBookingSuccess(bookingData) {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.innerHTML = `
            <div class="booking-modal-content">
                <div class="booking-modal-header">
                    <h3>Booking Successful!</h3>
                    <button class="close-modal" onclick="closeBookingModal()">&times;</button>
                </div>
                <div class="booking-modal-body">
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h4>Thank you for your booking!</h4>
                        <p>Your ${bookingData.serviceName} service has been scheduled for ${bookingData.serviceDate} at ${bookingData.serviceTime}.</p>
                        <p>Total cost: $${bookingData.totalCost}</p>
                        <p>We'll send a confirmation email to ${bookingData.customerEmail} with further details.</p>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-primary" onclick="closeBookingModal()">Close</button>
                    </div>
                </div>
                    </div>`;
    }
}

// Show payment section
function showPaymentSection() {
    const formSection = document.querySelector('.booking-modal-body');
    const paymentSection = document.getElementById('paymentSection');

    if (formSection && paymentSection) {
        formSection.style.display = 'none';
        paymentSection.style.display = 'block';

        // Populate payment summary
        populatePaymentSummary();

        // Set up payment method switching
        setupPaymentMethodSwitching();
    }
}

// Go back to form
function goBackToForm() {
    const formSection = document.querySelector('.booking-modal-body');
    const paymentSection = document.getElementById('paymentSection');

    if (formSection && paymentSection) {
        paymentSection.style.display = 'none';
        formSection.style.display = 'block';
    }
}

// Populate payment summary
function populatePaymentSummary() {
    if (window.booking) {
        document.getElementById('paymentServiceName').textContent = window.booking.serviceName;
        document.getElementById('paymentServiceDate').textContent = window.booking.serviceDate;
        document.getElementById('paymentServiceTime').textContent = window.booking.serviceTime;
        document.getElementById('paymentServiceHours').textContent = window.booking.serviceHours + ' hours';
        document.getElementById('paymentTotalAmount').textContent = '$' + window.booking.totalCost;

        // Generate bank reference
        const reference = 'YHP' + Date.now().toString().slice(-6);
        document.getElementById('bankReference').textContent = reference;
    }
}

// Setup payment method switching
function setupPaymentMethodSwitching() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardForm = document.getElementById('creditCardForm');
    const paypalForm = document.getElementById('paypalForm');
    const bankTransferForm = document.getElementById('bankTransferForm');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function () {
            // Hide all forms
            creditCardForm.style.display = 'none';
            paypalForm.style.display = 'none';
            bankTransferForm.style.display = 'none';

            // Show selected form
            switch (this.value) {
                case 'creditCard':
                    creditCardForm.style.display = 'block';
                    break;
                case 'paypal':
                    paypalForm.style.display = 'block';
                    break;
                case 'bankTransfer':
                    bankTransferForm.style.display = 'block';
                    break;
            }
        });
    });

    // Set up input formatting
    setupInputFormatting();
}

// Process payment
function processPayment() {
    // Check if form data exists
    if (!window.booking) {
        alert('Booking information not found. Please try again.');
        return;
    }

    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const formData = window.booking;

    // Debug log
    console.log('Processing payment with form data:', formData);
    console.log('Selected payment method:', selectedMethod);

    // Store selected payment method for later use
    window.selectedPaymentMethod = selectedMethod;

    // Validate payment details based on method
    if (selectedMethod === 'creditCard') {
        if (!validateCreditCard()) {
            return;
        }
    }

    // Simulate payment processing
    showPaymentProcessing();

    setTimeout(() => {
        // Simulate successful payment
        console.log('Payment processing complete, showing success with data:', formData);
        showPaymentSuccess(formData);
    }, 1000);
}

// Validate credit card
function validateCreditCard() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardholderName = document.getElementById('cardholderName').value;

    if (!cardNumber || cardNumber.length < 13) {
        alert('Please enter a valid card number');
        return false;
    }

    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter expiry date in MM/YY format');
        return false;
    }

    if (!cvv || cvv.length < 3) {
        alert('Please enter a valid CVV');
        return false;
    }

    if (!cardholderName.trim()) {
        alert('Please enter cardholder name');
        return false;
    }

    return true;
}

// Show payment processing
function showPaymentProcessing() {
    const paymentSection = document.getElementById('paymentSection');
    if (paymentSection) {
        // Hide the payment form and show processing
        const paymentForm = paymentSection.querySelector('.payment-methods');
        const paymentForms = paymentSection.querySelectorAll('.payment-form');
        const paymentSummary = paymentSection.querySelector('.payment-summary');
        const formActions = paymentSection.querySelector('.form-actions');

        if (paymentForm) paymentForm.style.display = 'none';
        paymentForms.forEach(form => form.style.display = 'none');
        if (paymentSummary) paymentSummary.style.display = 'none';
        if (formActions) formActions.style.display = 'none';

        // Show processing screen
        paymentSection.innerHTML += `
            <div class="payment-processing" id="processingScreen">
                <div class="processing-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <h3>Processing Payment...</h3>
                <p>Please wait while we process your payment securely.</p>
                <p>Do not close this window or refresh the page.</p>
            </div>
        `;
    }
}

// Show payment success
function showPaymentSuccess(bookingData) {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        // Replace the entire modal content with success message
        modal.innerHTML = `
            <div class="booking-modal-content">
                <div class="booking-modal-header">
                    <h3>Payment Successful!</h3>
                    <button class="close-modal" onclick="closeBookingModal()">&times;</button>
                </div>
                <div class="booking-modal-body">
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h4>Thank you for your payment!</h4>
                        <p>Your ${bookingData.serviceName} service has been confirmed and scheduled for ${bookingData.serviceDate} at ${bookingData.serviceTime}.</p>
                        <p>Provider: ${bookingData.providerName}</p>
                        <p>Total paid: $${bookingData.totalCost}</p>
                        <p>We'll send a confirmation email to ${bookingData.customerEmail} with your receipt and service details.</p>
                        <div class="receipt-details">
                            <h5>Receipt Details</h5>
                            <p><strong>Transaction ID:</strong> YHP${Date.now().toString().slice(-8)}</p>
                            <p><strong>Payment Method:</strong> ${window.selectedPaymentMethod === 'creditCard' ? 'Credit Card' :
                window.selectedPaymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}</p>
                            <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-primary" onclick="closeBookingModal()">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Send email to provider
        if (bookingData.providerEmail) {
            sendProviderEmail(bookingData);
        }
    }
}

// Send email to provider about new booking
function sendProviderEmail(bookingData) {
    // In a real application, this would call a backend API to send emails
    // For now, we'll simulate the email sending process

    console.log('Sending email to provider:', bookingData.providerEmail);

    // Simulate email sending
    const emailData = {
        to: bookingData.providerEmail,
        subject: `New ${bookingData.serviceName} Service Booking - YourHomePro`,
        body: `
Dear ${bookingData.providerName},

You have received a new service booking through YourHomePro!

Booking Details:
- Service: ${bookingData.serviceName}
- Customer: ${bookingData.customerName}
- Date: ${bookingData.serviceDate}
- Time: ${bookingData.serviceTime}
- Duration: ${bookingData.serviceHours} hours
- Address: ${bookingData.serviceAddress}
- Total Amount: $${bookingData.totalCost}
- Customer Phone: ${bookingData.customerPhone}
- Customer Email: ${bookingData.customerEmail}

Customer Description:
${bookingData.customerDescription || 'No additional description provided.'}

Please contact the customer within 24 hours to confirm the booking and discuss any specific requirements.

Transaction ID: YHP${Date.now().toString().slice(-8)}

Best regards,
YourHomePro Team
        `.trim()
    };

    // Show email sent confirmation
    showEmailSentConfirmation(bookingData.providerName);

    // In a real app, you would send this to your backend:
    // fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(emailData)
    // });
}

// Show email sent confirmation
function showEmailSentConfirmation(providerName) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'email-notification';
    notification.innerHTML = `
        <div class="email-notification-content">
            <i class="fas fa-envelope"></i>
            <span>Email sent to ${providerName} about the new booking!</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Setup input formatting
function setupInputFormatting() {
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}
