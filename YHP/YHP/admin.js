// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const adminSections = document.querySelectorAll('.admin-section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
            adminSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Mobile sidebar toggle (for future mobile implementation)
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.admin-sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle('active');
            }
        });
        
        // Close sidebar when clicking overlay
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
                this.classList.remove('active');
            });
        }
        
        // Close sidebar when clicking navigation links on mobile
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('active');
                    if (sidebarOverlay) {
                        sidebarOverlay.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                // Add logout logic here
                alert('Logging out...');
                // window.location.href = 'login.html';
            }
        });
    }
    
    // Search functionality for users section
    const userSearchInput = document.querySelector('#users .search-box input');
    if (userSearchInput) {
        userSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('#users tbody tr');
            
            tableRows.forEach(row => {
                const userName = row.cells[1].textContent.toLowerCase();
                const userEmail = row.cells[2].textContent.toLowerCase();
                
                if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Action buttons functionality
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
    
    // Service card actions
    const serviceEditBtns = document.querySelectorAll('.service-card .btn-secondary');
    const serviceDeleteBtns = document.querySelectorAll('.service-card .btn-danger');
    
    serviceEditBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            handleServiceEdit(serviceName);
        });
    });
    
    serviceDeleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            handleServiceDelete(serviceName);
        });
    });
    
    // Table action buttons
    const tableEditBtns = document.querySelectorAll('.btn-icon .fa-edit');
    const tableDeleteBtns = document.querySelectorAll('.btn-icon .fa-trash');
    
    tableEditBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.cells[1].textContent;
            handleUserEdit(userName);
        });
    });
    
    tableDeleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.cells[1].textContent;
            handleUserDelete(userName);
        });
    });
    
    // Add new user button
    const addUserBtn = document.querySelector('#users .btn-primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            showAddUserModal();
        });
    }
    
    // Add new service button
    const addServiceBtn = document.querySelector('#services .btn-primary');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', function() {
            showAddServiceModal();
        });
    }
    
    // Initialize dashboard with sample data
    initializeDashboard();
    
    // Auto-refresh dashboard stats every 30 seconds
    setInterval(updateDashboardStats, 30000);
});

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'Add New Service':
            showAddServiceModal();
            break;
        case 'Add Provider':
            showAddProviderModal();
            break;
        case 'Send Newsletter':
            showNewsletterModal();
            break;
        case 'Export Data':
            exportData();
            break;
        default:
            console.log('Action not implemented:', action);
    }
}

// Handle service edit
function handleServiceEdit(serviceName) {
    alert(`Editing service: ${serviceName}\n\nThis would open an edit modal with service details.`);
}

// Handle service delete
function handleServiceDelete(serviceName) {
    if (confirm(`Are you sure you want to delete "${serviceName}"?`)) {
        alert(`Service "${serviceName}" has been deleted.`);
        // Add actual deletion logic here
    }
}

// Handle user edit
function handleUserEdit(userName) {
    alert(`Editing user: ${userName}\n\nThis would open an edit modal with user details.`);
}

// Handle user delete
function handleUserDelete(userName) {
    if (confirm(`Are you sure you want to delete user "${userName}"?`)) {
        alert(`User "${userName}" has been deleted.`);
        // Add actual deletion logic here
    }
}

// Show add user modal
function showAddUserModal() {
    const modalHTML = `
        <div class="modal-overlay" id="addUserModal">
            <div class="modal">
                <div class="modal-header">
                    <h3>Add New User</h3>
                    <button class="modal-close" onclick="closeModal('addUserModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="addUserForm">
                        <div class="form-group">
                            <label for="userName">Full Name</label>
                            <input type="text" id="userName" name="userName" required>
                        </div>
                        <div class="form-group">
                            <label for="userEmail">Email</label>
                            <input type="email" id="userEmail" name="userEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="userPhone">Phone</label>
                            <input type="tel" id="userPhone" name="userPhone">
                        </div>
                        <div class="form-group">
                            <label for="userStatus">Status</label>
                            <select id="userStatus" name="userStatus">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('addUserModal')">Cancel</button>
                    <button class="btn btn-primary" onclick="submitAddUser()">Add User</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
}

// Show add service modal
function showAddServiceModal() {
    const modalHTML = `
        <div class="modal-overlay" id="addServiceModal">
            <div class="modal">
                <div class="modal-header">
                    <h3>Add New Service</h3>
                    <button class="modal-close" onclick="closeModal('addServiceModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="addServiceForm">
                        <div class="form-group">
                            <label for="serviceName">Service Name</label>
                            <input type="text" id="serviceName" name="serviceName" required>
                        </div>
                        <div class="form-group">
                            <label for="serviceDescription">Description</label>
                            <textarea id="serviceDescription" name="serviceDescription" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="serviceCategory">Category</label>
                            <select id="serviceCategory" name="serviceCategory">
                                <option value="home-maintenance">Home Maintenance</option>
                                <option value="cleaning">Cleaning</option>
                                <option value="electrical">Electrical</option>
                                <option value="plumbing">Plumbing</option>
                                <option value="painting">Painting</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('addServiceModal')">Cancel</button>
                    <button class="btn btn-primary" onclick="submitAddService()">Add Service</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
}

// Show add provider modal
function showAddProviderModal() {
    alert('Add Provider modal would open here.\n\nThis would include fields for:\n- Company Name\n- Contact Person\n- Services Offered\n- Location\n- Verification Documents');
}

// Show newsletter modal
function showNewsletterModal() {
    alert('Newsletter modal would open here.\n\nThis would include fields for:\n- Subject Line\n- Message Content\n- Target Audience\n- Send Date');
}

// Export data functionality
function exportData() {
    alert('Exporting data...\n\nThis would generate and download:\n- User reports\n- Service statistics\n- Booking analytics\n- Revenue data');
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

// Submit add user form
function submitAddUser() {
    const form = document.getElementById('addUserForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!formData.get('userName') || !formData.get('userEmail')) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    alert(`User "${formData.get('userName')}" has been added successfully!`);
    closeModal('addUserModal');
    
    // Here you would typically send the data to your backend
    console.log('Form data:', Object.fromEntries(formData));
}

// Submit add service form
function submitAddService() {
    const form = document.getElementById('addServiceForm');
    const formData = new FormData(form);
    
    // Validate form
    if (!formData.get('serviceName') || !formData.get('serviceDescription')) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    alert(`Service "${formData.get('serviceName')}" has been added successfully!`);
    closeModal('addServiceModal');
    
    // Here you would typically send the data to your backend
    console.log('Form data:', Object.fromEntries(formData));
}

// Add modal styles dynamically
function addModalStyles() {
    if (!document.getElementById('modalStyles')) {
        const styles = `
            <style id="modalStyles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                }
                
                .modal {
                    background: white;
                    border-radius: 15px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                
                .modal-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: #333;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    background: #f8f9fa;
                    color: #333;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .modal-footer {
                    padding: 1.5rem;
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                }
                
                .form-group {
                    margin-bottom: 1rem;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #333;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #e9ecef;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #ff6b35;
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
                }
                
                .form-group textarea {
                    resize: vertical;
                    min-height: 80px;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Initialize dashboard with sample data
function initializeDashboard() {
    // This function would typically fetch real data from your backend
    console.log('Dashboard initialized with sample data');
}

// Update dashboard stats (simulated)
function updateDashboardStats() {
    // This function would typically fetch updated stats from your backend
    console.log('Dashboard stats updated');
    
    // Simulate real-time updates
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (stat.textContent.includes(',')) {
            const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 10);
            stat.textContent = newValue.toLocaleString();
        }
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add smooth scrolling to sections
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                closeModal(modal.id);
            }
        });
    }
});

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Simulate API calls with loading states
function simulateAPICall(button, duration = 2000) {
    const removeLoading = addLoadingState(button);
    
    setTimeout(() => {
        removeLoading();
    }, duration);
}

// Add this to buttons that need loading states
document.addEventListener('DOMContentLoaded', function() {
    const apiButtons = document.querySelectorAll('.btn-primary');
    apiButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Add') || this.textContent.includes('Save')) {
                simulateAPICall(this, 1500);
            }
        });
    });
});
