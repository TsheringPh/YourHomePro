// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on nav links
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    
    if (searchInput && searchDropdown) {
        // Show dropdown on focus
        searchInput.addEventListener('focus', function() {
            searchDropdown.style.display = 'block';
        });
        
        // Hide dropdown on click outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.style.display = 'none';
            }
        });
        
        // Search input functionality
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                // Show search results logic here if needed
                console.log('Searching for:', query);
            }
        });
    }
    
    // Password toggle functionality
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (type === 'password') {
                icon.className = 'fas fa-eye';
            } else {
                icon.className = 'fas fa-eye-slash';
            }
        });
    }
    
    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            const remember = formData.get('remember');
            
            // Basic validation
            if (!email || !password) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate login process
            showMessage('Signing in...', 'info');
            
            // Simulate API call delay
            setTimeout(() => {
                // For demo purposes, accept any email/password combination
                if (email && password) {
                    showMessage('Login successful! Redirecting...', 'success');
                    
                    // Store login state if remember me is checked
                    if (remember) {
                        localStorage.setItem('rememberLogin', 'true');
                        localStorage.setItem('userEmail', email);
                    }
                    
                    // Redirect to admin panel after successful login
                    setTimeout(() => {
                        window.location.href = 'admin.html';
                    }, 1500);
                } else {
                    showMessage('Invalid credentials. Please try again.', 'error');
                }
            }, 2000);
        });
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            showMessage(`Connecting to ${provider}...`, 'info');
            
            // Simulate social login delay
            setTimeout(() => {
                showMessage(`${provider} login not implemented in demo.`, 'warning');
            }, 1500);
        });
    });
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('Password reset feature not implemented in demo.', 'warning');
        });
    }
    
    // Check if user was previously logged in
    checkPreviousLogin();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Message display function
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message-popup message-${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <i class="fas ${getMessageIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getMessageColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 350px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(messageElement);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Add click to dismiss
    messageElement.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (this.parentNode) {
                this.remove();
            }
        }, 300);
    });
}

// Get message icon based on type
function getMessageIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// Get message color based on type
function getMessageColor(type) {
    switch (type) {
        case 'success': return '#27ae60';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        case 'info': return '#3498db';
        default: return '#3498db';
    }
}

// Check if user was previously logged in
function checkPreviousLogin() {
    const rememberLogin = localStorage.getItem('rememberLogin');
    const userEmail = localStorage.getItem('userEmail');
    
    if (rememberLogin === 'true' && userEmail) {
        // Pre-fill email field
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = userEmail;
        }
        
        // Check remember me checkbox
        const rememberCheckbox = document.getElementById('remember');
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .message-popup {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .message-popup:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .message-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);
