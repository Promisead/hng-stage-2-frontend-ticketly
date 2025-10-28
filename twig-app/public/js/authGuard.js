(function() {
    console.log("Auth Guard Running...");
    const sessionToken = localStorage.getItem('ticketapp_session');
    const user = localStorage.getItem('ticketapp_user'); 

    if (!sessionToken || !user) {
        console.log("No session token or user found. Redirecting to login.");
        window.location.replace('/auth/login');

        if (typeof Toastify === 'function') {
             Toastify({
                text: "Your session has expired — please log in again.",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
            }).showToast();
        } else {
            alert("Your session has expired — please log in again.");
        }
    } else {
        console.log("Session token found. Access granted.");
    }
})(); 