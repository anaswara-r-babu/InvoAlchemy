

// Retrieve the company details from localStorage and display them
document.addEventListener('DOMContentLoaded', () => {

    const displayInvoiceNum = document.getElementById('display-invoice-num');
    const storedInvoiceNum = localStorage.getItem('invoiceNum');
    if (storedInvoiceNum) {
        displayInvoiceNum.textContent = storedInvoiceNum;
    } else {
        displayInvoiceNum.textContent = 'N/A'; 
    }

    const storedCompanyDetails = localStorage.getItem('companyDetails');
    if (storedCompanyDetails) {
        const companyDetails = JSON.parse(storedCompanyDetails);

        // Display the details in the billing-details section
        document.getElementById('billing-name').textContent = companyDetails.name;
        document.getElementById('billing-address').textContent = companyDetails.address;
        document.getElementById('billing-email').textContent = companyDetails.email;
        document.getElementById('billing-phone').textContent = companyDetails.phone;
    }
// });


// Retrieve the client details from localStorage and display them
// document.addEventListener('DOMContentLoaded', () => {
    const storedClientDetails = localStorage.getItem('clientsDetails');
    if (storedClientDetails) {
        const clientsDetails = JSON.parse(storedClientDetails);

        // Display the details in the billing-details section
        document.getElementById('billingto-name').textContent = clientsDetails.name;
        document.getElementById('billingto-address').textContent = clientsDetails.address;
        document.getElementById('billingto-email').textContent = clientsDetails.email;
        document.getElementById('billingto-phone').textContent = clientsDetails.phone;
    }
// });

// retrieve the date 
// document.addEventListener('DOMContentLoaded', () => {
    const storedDateDetail = localStorage.getItem('storedDate');
    if (storedDateDetail) {
        document.getElementById('date').textContent= storedDateDetail;
    }
// });

// Retrieve saved data from localStorage
const allDetails = JSON.parse(localStorage.getItem('allDetails')) || {};
const itemsData = allDetails.itemsData || [];
const displayTableBody = document.getElementById('displayTableBody');
const displaySubtotal = document.getElementById('res-subtotal');
const displayTax = document.getElementById('res-tax');
const displayTotal = document.getElementById('res-total');

// Populate table with items data
itemsData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.desc}</td>
        <td>${item.qty}</td>
        <td>₹ ${item.price.toFixed(2)}</td>
        <td>${item.tax}</td>
        <td>₹ ${item.subtotal.toFixed(2)}</td>
    `;
    displayTableBody.appendChild(row);
});

// Display subtotal, tax, and total
displaySubtotal.textContent = `₹ ${allDetails.totalsub.toFixed(2)}`;
displayTax.textContent = `₹ ${allDetails.totalTax.toFixed(2)}`;
displayTotal.textContent = `₹ ${(allDetails.totalsub + allDetails.totalTax).toFixed(2)}`;

const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

// Display payment information
document.getElementById('res-upi').textContent = paymentDetails.upi || 'N/A';
document.getElementById('res-gst').textContent = paymentDetails.acno || 'N/A';
document.getElementById('res-method').textContent = paymentDetails.paymentMethod || 'N/A';
document.getElementById('res-note').textContent = paymentDetails.notes || 'N/A';
document.getElementById('res-term').textContent = paymentDetails.terms || 'N/A';

});
