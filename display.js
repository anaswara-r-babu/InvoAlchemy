

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

// converting digits into words 
// Helper function to format number with commas (Indian style)
function formatWithCommas(num) {
    // return num.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",").replace(/(\d+),(?=(\d{3}))/g, "$1,");
    const numStr = num.toString();
    const lastThree = numStr.slice(-3);
    const otherNumbers = numStr.slice(0, -3);
    
    // If the number is greater than 999, format accordingly
    if (otherNumbers !== '') {
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    } else {
        return lastThree;
    }
}
function numberToWords(num) {
    const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
                         "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];

    if (num === 0) return "Zero";

    let word = '';

    function helper(n) {
        if (n < 20) {
            return belowTwenty[n];
        } else if (n < 100) {
            return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "");
        } else if (n < 1000) {
            return belowTwenty[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + helper(n % 100) : "");
        } else {
            return "";
        }
    }

    // // american numbering 
    // let i = 0;
    // while (num > 0) {
    //     if (num % 1000 !== 0) {
    //         word = helper(num % 1000) + " " + thousands[i] + (word ? " " + word : "");
    //     }
    //     num = Math.floor(num / 1000);
    //     i++;
    // }

    // return word.trim();

    // indian numbering 
    // Break number into parts: Crores, Lakhs, Thousands, Hundreds
    let crore = Math.floor(num / 10000000);
    num %= 10000000;
    let lakh = Math.floor(num / 100000);
    num %= 100000;
    let thousand = Math.floor(num / 1000);
    num %= 1000;
    let hundred = num;

    if (crore) word += helper(crore) + " Crore ";
    if (lakh) word += helper(lakh) + " Lakh ";
    if (thousand) word += helper(thousand) + " Thousand ";
    if (hundred) word += helper(hundred);

    return word.trim();
}

    var totalAmount = parseInt(document.getElementById('res-total').textContent.replace('₹', '').trim(), 10); 
    var formattedAmount = formatWithCommas(totalAmount);
    var words = numberToWords(totalAmount); 
    document.getElementById('res-total').textContent = `₹ ${formattedAmount}`;
    document.getElementById('res-words').textContent = words + ' Rupees Only';

});
