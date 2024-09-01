

// Retrieve the company details from localStorage and display them
document.addEventListener('DOMContentLoaded', () => {
    const storedCompanyDetails = localStorage.getItem('companyDetails');
    if (storedCompanyDetails) {
        const companyDetails = JSON.parse(storedCompanyDetails);

        // Display the details in the billing-details section
        document.getElementById('billing-name').textContent = companyDetails.name;
        document.getElementById('billing-address').textContent = companyDetails.address;
        document.getElementById('billing-email').textContent = companyDetails.email;
        document.getElementById('billing-phone').textContent = companyDetails.phone;
    }
});


// Retrieve the client details from localStorage and display them
document.addEventListener('DOMContentLoaded', () => {
    const storedClientDetails = localStorage.getItem('clientsDetails');
    if (storedClientDetails) {
        const clientsDetails = JSON.parse(storedClientDetails);

        // Display the details in the billing-details section
        document.getElementById('billingto-name').textContent = clientsDetails.name;
        document.getElementById('billingto-address').textContent = clientsDetails.address;
        document.getElementById('billingto-email').textContent = clientsDetails.email;
        document.getElementById('billingto-phone').textContent = clientsDetails.phone;
    }
});

// retrieve the date 
document.addEventListener('DOMContentLoaded', () => {
    const storedDateDetail = localStorage.getItem('storedDate');
    if (storedDateDetail) {
        document.getElementById('date').textContent= storedDateDetail;
    }
});
