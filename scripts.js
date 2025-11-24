// JavaScript for Hospital Patient Record System

document.addEventListener('DOMContentLoaded', function() {
    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('You have 3 unread notifications:\n- New lab results for Patient PT-7894\n- Medication due for Patient PT-5421\n- System maintenance scheduled tonight');
        });
    }
    
    // Sidebar menu items click
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update page title based on selection
            const pageTitle = document.querySelector('.page-title h1');
            if (pageTitle && this.textContent.includes('Dashboard')) {
                pageTitle.textContent = 'Patient Dashboard';
            } else if (pageTitle && this.textContent.includes('Patients')) {
                pageTitle.textContent = 'Patient Management';
            }
        });
    });
    
    // Patient list view buttons
    const viewButtons = document.querySelectorAll('.view-patient-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const patientName = this.getAttribute('data-patient');
            alert(`Viewing details for ${patientName}`);
            
            // Update patient profile section
            const profileTitle = document.querySelector('.patient-profile + .page-title h1');
            if (profileTitle) {
                profileTitle.textContent = `Patient Profile: ${patientName}`;
            }
            
            // Update patient name in profile
            const patientNameElement = document.querySelector('.patient-details h2');
            if (patientNameElement) {
                patientNameElement.textContent = patientName;
            }
            
            // Update patient avatar initials
            const patientAvatar = document.querySelector('.patient-avatar');
            if (patientAvatar) {
                const names = patientName.split(' ');
                const initials = names[0].charAt(0) + (names.length > 1 ? names[names.length - 1].charAt(0) : '');
                patientAvatar.textContent = initials;
            }
        });
    });
    
    // New Patient button
    const newPatientBtn = document.getElementById('newPatientBtn');
    if (newPatientBtn) {
        newPatientBtn.addEventListener('click', function() {
            const newPatientName = prompt('Enter new patient name:');
            if (newPatientName) {
                alert(`Creating new patient record for ${newPatientName}`);
                // In a real application, this would open a form or redirect to a new page
            }
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                    this.value = '';
                }
            }
        });
    }
    
    // User profile dropdown (simplified)
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            alert('Profile options:\n- View Profile\n- Settings\n- Logout');
        });
    }
    
    // Simulate real-time updates
    setInterval(function() {
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            const count = parseInt(notificationBadge.textContent);
            if (count < 5) {
                notificationBadge.textContent = count + 1;
                notificationBadge.style.backgroundColor = 'var(--danger)';
                
                // Add pulse animation
                notificationBadge.classList.add('pulse');
                setTimeout(() => {
                    notificationBadge.classList.remove('pulse');
                }, 1000);
            }
        }
    }, 30000); // Update every 30 seconds
    
    // Add some dynamic data to the dashboard
    updateDashboardStats();
});

// Function to update dashboard statistics with random fluctuations
function updateDashboardStats() {
    setInterval(function() {
        // Update appointments
        const scheduledElement = document.querySelector('.card:nth-child(1) .stat:nth-child(1) .stat-value');
        const completedElement = document.querySelector('.card:nth-child(1) .stat:nth-child(2) .stat-value');
        
        if (scheduledElement && completedElement) {
            const scheduled = parseInt(scheduledElement.textContent);
            const completed = parseInt(completedElement.textContent);
            
            // Randomly update stats to simulate real-time changes
            if (completed < scheduled && Math.random() > 0.7) {
                completedElement.textContent = completed + 1;
                
                // Update patient statistics as well
                const admittedElement = document.querySelector('.card:nth-child(2) .stat:nth-child(1) .stat-value');
                if (admittedElement) {
                    admittedElement.textContent = parseInt(admittedElement.textContent) + 1;
                }
            }
        }
    }, 10000); // Update every 10 seconds
}

// Add some CSS for the pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .pulse {
        animation: pulse 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);