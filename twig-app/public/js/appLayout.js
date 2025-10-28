document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('app-sidebar');
    const toggleButton = document.getElementById('sidebar-toggle-button');
    const mainContent = document.getElementById('main-content'); 
    const navLinks = document.querySelectorAll('.nav-link');
    const linkTexts = document.querySelectorAll('.link-text');
    const iconOpen = toggleButton?.querySelector('.icon-open');
    const iconClosed = toggleButton?.querySelector('.icon-closed');

    const welcomeMsg = document.getElementById('header-welcome-message');
    const userInitial = document.getElementById('header-user-initial');
    const logoutButton = document.getElementById('logout-button');

    let isSidebarOpen = false; 

    function updateSidebarState() {
        if (sidebar) {
            sidebar.dataset.open = isSidebarOpen; 
        }
        navLinks.forEach(link => link.dataset.open = isSidebarOpen);
        linkTexts.forEach(text => text.dataset.open = isSidebarOpen);

        if (iconOpen && iconClosed) {
            iconOpen.classList.toggle('hidden', !isSidebarOpen);
            iconClosed.classList.toggle('hidden', isSidebarOpen);
        }

        if (mainContent) {
            if (isSidebarOpen && window.innerWidth < 640) { 
                 mainContent.classList.add('hidden', 'sm:block'); 
            } else {
                 mainContent.classList.remove('hidden'); 
            }
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            isSidebarOpen = !isSidebarOpen;
            updateSidebarState();
        });
    }

    const userString = localStorage.getItem('ticketapp_user');
    if (userString) {
        try {
            const user = JSON.parse(userString);
            if (welcomeMsg) {
                welcomeMsg.textContent = `Welcome, ${user.name || 'User'}!`;
            }
            if (userInitial && user.name) {
                userInitial.textContent = user.name[0].toUpperCase();
            }
        } catch (e) { console.error("Error parsing user for header:", e); }
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('ticketapp_session');
            localStorage.removeItem('ticketapp_user');
            Toastify({ text: "Logged out.", duration: 2000 }).showToast();
            window.location.replace('/auth/login'); 
        });
    }

     window.addEventListener('resize', () => {
         if (mainContent) {
             if (isSidebarOpen && window.innerWidth < 640) {
                 mainContent.classList.add('hidden', 'sm:block');
             } else {
                 mainContent.classList.remove('hidden');
             }
         }
     });

    updateSidebarState();
}); 