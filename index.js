const fromDetails = document.getElementById('from-details');
const todetails = document.getElementById('to-details');
const invoiceInput = document.getElementById('invoice-num');
const popupForm = document.getElementById('popupForm');
const closeFormBtn = document.getElementById('closeFormBtn');
const submitPopup = document.getElementById('submit-btn')
const add_item = document.querySelector('.add-item');

const tbody = document.getElementById('itemTableBody');
const xbtn = document.getElementById('close-btn');

const dateInput = document.getElementById('date');

const downloadBtn = document.getElementById('download');

let totalsub = 0;
let totalTax = 0;


const upiInput = document.querySelector('.upi');
const acnoInput = document.querySelector('.acno');
const radioGroup = document.querySelectorAll('input[name="payment-method"]');
const note = document.getElementById('notes-input');
const term = document.getElementById('terms-input');


// Invoice summary elements
const resSubtotal = document.getElementById('res-subtotal');
const resTax = document.getElementById('res-tax');
const resTotal = document.getElementById('res-total');


const Total = 0;
// Array to store each row's data
let itemsData = [];

let companyDetails = {
    name :'',
    address:'',
    email:'',
    phno:'',
};

let clientsDetails = {
    name: '',
    address: '',
    email: '',
    phno: '',
};


// FUNC 

// Function to save items data to local storage
function saveItemsData() {
    // localStorage.setItem('itemsData', JSON.stringify(itemsData));
    const rows = document.querySelectorAll('#itemTableBody .table-inputs');

    itemsData = Array.from(rows).map((row) => {
        const desc = row.querySelector('.description').value || '';
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const tax = parseFloat(row.querySelector('.taxation').value) || 0;
        const subtotal = qty * price;

        return { desc, qty, price, tax, subtotal };
    });

    localStorage.setItem('itemsData', JSON.stringify(itemsData));
}

function displayPopUp(type) {
    clearFormInputs();
// Check if we are editing the client or company details
if (type === 'client') {
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // Check if client details are already stored
    const storedClientDetails = JSON.parse(localStorage.getItem('clientsDetails'));

    if (storedClientDetails) {
        name.value = storedClientDetails.name || '';
        address.value = storedClientDetails.address || '';
        email.value = storedClientDetails.email || '';
        phone.value = storedClientDetails.phone || '';
    }
// } else if (type === 'company') {
//     const companyName = document.getElementById('companyName');
//     const companyAddress = document.getElementById('companyAddress');
//     const companyEmail = document.getElementById('companyEmail');
//     const companyPhone = document.getElementById('companyPhone');

//     // Check if company details are already stored
//     const storedCompanyDetails = JSON.parse(localStorage.getItem('companyDetails'));

//     if (storedCompanyDetails) {
//         companyName.value = storedCompanyDetails.companyName || '';
//         companyAddress.value = storedCompanyDetails.companyAddress || '';
//         companyEmail.value = storedCompanyDetails.companyEmail || '';
//         companyPhone.value = storedCompanyDetails.companyPhone || '';
//     }
}
popupForm.style.display = 'flex';
}

// clearing existing values from form 
function clearFormInputs(){
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    name.value='';
    address.value='';
    email.value='';
    phone.value='';
}


// form submission for company details
function formSubmitComp(e) {
    e.preventDefault();
    formSubmit('company');
}

// form submission for client details
function formSubmitClient(e) {
    e.preventDefault();
    formSubmit('client');
}

// Function to format date as YYYY-MM-DD
// function getCurrentDateFormatted() {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
// }

// // Set the current date as the default value for the date input
// function setDefaultDate() {
//     const dateInput = document.getElementById('date');
//     dateInput.value = getCurrentDateFormatted();
// } 

// Save the date input value to local storage
// function saveDate() {
//     const dateInput = document.getElementById('date');
//     const selectedDate = dateInput.value;
//     localStorage.setItem('storedDate', selectedDate);
// }

// invoice id 
invoiceInput.addEventListener('input', () => {
    const invoiceNum = invoiceInput.value.trim();
    localStorage.setItem('invoiceNum', invoiceNum);
});

// submitting form (company)
function formSubmit (type) {
    
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    let valid = true;

    // Clear previous error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('address-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('phone-error').textContent = '';

    if (!name.value.trim()) {
        document.getElementById('name-error').textContent = 'Name is required.';
        name.style.border = '2px solid red';
        valid = false;
    } else {
        name.style.border = '';
    }


    if (!address.value.trim()) {
        document.getElementById('address-error').textContent = 'Address is required.';
        address.style.border = '2px solid red';
        valid = false;
    } else {
        address.style.border = ''; 
    }


    if (!validateEmail(email.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        email.style.border = '2px solid red';
        valid = false;
    } else {
        email.style.border = ''; 
    }

    if (!validatePhone(phone.value.trim())) {
        document.getElementById('phone-error').textContent = 'Please enter a valid phone number.';
        phone.style.border = '2px solid red';
        valid = false;
    } else {
        phone.style.border = ''; 
    }

    if (!valid) return;

    if (type === 'company'){
        companyDetails = {
            name:name.value,
            address:address.value,
            email: email.value,
            phone: phone.value,
        };

        // Store company details in local storage
        localStorage.setItem('companyDetails', JSON.stringify(companyDetails));

         // Update from-details with company details
         updateFromDetails();

        // console.log( 'company details :',companyDetails);
    } else if(type === 'client') {
        clientsDetails ={
            name: name.value,
            address:address.value,
            email:email.value,
            phone:phone.value,
        }

         // Store client details in local storage
         localStorage.setItem('clientsDetails', JSON.stringify(clientsDetails));

         updateToDetails();
        // console.log( 'client details :',clientsDetails);
    }
    
    
    // fromDetails.innerHTML = `
    //     <p>FROM</p>
    //     <h3><strong>${companyDetails.name}<strong></h3>
    //     <p class="details">${companyDetails.address}</p>
    //     <p>${companyDetails.email}</p>
    //     <p>${companyDetails.phone}</p>
    // `;

    // Close the form popup
    popupForm.style.display = 'none';
    
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation function (digits only)
function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

// Function to update the from-details div with companyDetails values
function updateFromDetails() {
    // Update the content with company details
    fromDetails.innerHTML = `
        <p>FROM</p>
        <h3><strong>${companyDetails.name}</strong></h3>
        <p class="details">${companyDetails.address}</p>
        <p>${companyDetails.email}</p>
        <p>${companyDetails.phone}</p>
    `;
}

// Function to update the to-details div with companyDetails values
function updateToDetails() {
    // Update the content with company details
    todetails.innerHTML = `
        <p>TO</p>
        <h3><strong>${clientsDetails.name}</strong></h3>
        <p class="details">${clientsDetails.address}</p>
        <p>${clientsDetails.email}</p>
        <p>${clientsDetails.phone}</p>
    `;
}

// Function to add event listeners to quantity and price inputs for real-time calculations

function addCalculationListeners(row , rowIndex) {
    const descInput = row.querySelector('.description');
    const qtyInput = row.querySelector('.qty'); 
    const priceInput = row.querySelector('.price');
    const taxInput = row.querySelector('.taxation');
    const subtotalLabel = row.querySelector('.subtotal');

    // Function to calculate subtotal
    function calculateSubtotal() {
        const desc = descInput.value.trim();
        const qty = parseFloat(qtyInput.value) || 0; 
        const price = parseFloat(priceInput.value) || 0; 
        const tax = parseFloat(taxInput.value) || 0;
        const subtotal = qty * price; 

        subtotalLabel.textContent = `₹ ${subtotal.toFixed(2)}`;

        itemsData[rowIndex] = {
            desc,
            qty,
            price,
            tax,
            subtotal
        };

        calculateTotal();
        calculateTax();
        calculateSum();
        saveItemsData();
        saveAllDetails() 
    }
    descInput.addEventListener('input', calculateSubtotal);
    qtyInput.addEventListener('input', calculateSubtotal);
    priceInput.addEventListener('input', calculateSubtotal);
    taxInput.addEventListener('input', calculateSubtotal);

}

// Function to save all details to local storage
function saveAllDetails() {
    // // Get date value
    // const dateValue = getDateValue();

    // Combine all details into a single object
    const allDetails = {
        // companyDetails: JSON.parse(localStorage.getItem('companyDetails')) || companyDetails,
        // clientsDetails: JSON.parse(localStorage.getItem('clientsDetails')) || clientsDetails,
        // paymentDetails: JSON.parse(localStorage.getItem('paymentDetails')) || {},
        itemsData: JSON.parse(localStorage.getItem('itemsData')) || itemsData,
        // date: dateValue,
        totalsub: totalsub,
        totalTax: totalTax,
        total: totalsub + totalTax,
    };

    // Save all details to local storage
    localStorage.setItem('allDetails', JSON.stringify(allDetails));

    // console.log('All details saved:', allDetails);
}

// total 
function calculateTotal() {
    // const totalsub = itemsData.reduce((acc, item) => acc + item.subtotal, 0);
    // resSubtotal.textContent = `₹ ${totalsub.toFixed(2)}`;
        totalsub = Array.from(tbody.querySelectorAll('.subtotal')).reduce((acc, label) => {
        const value = parseFloat(label.textContent.replace('₹ ', '')) || 0;
        return acc + value;
    }, 0);

    // Update the subtotal display
    resSubtotal.textContent = `₹ ${totalsub.toFixed(2)}`;
}

// calculating tax 
function calculateTax(){
        totalTax = Array.from(tbody.querySelectorAll('.taxation')).reduce((acc, input) => {
        const value = parseFloat(input.value) || 0;
        return acc + value;
    }, 0);

    // Update the total tax display
    resTax.textContent = `₹ ${totalTax.toFixed(2)}`;
}

// calculating total sum 
function calculateSum(){
    const Total = totalsub+ totalTax;

    // Update the total tax display
    resTotal.textContent = `₹ ${Total.toFixed(2)}`;
    resTotal.style.fontWeight = 'bold'; 
    resTotal.style.fontSize = '18px';
}

function newRowCreation() {
    // const tbody = document.getElementById('itemTableBody');
    const newRow = document.createElement('tr');
    newRow.classList.add('table-inputs');

    newRow.innerHTML = `
        <td id="first-inp"><input type="text" class="item-control wide description" placeholder="Enter the Item"></td>
        <td id="rightside"><input type="number" class="item-control small qty" required value="1"></td>
        <td id="rightside"><input type="number" class="item-control small price" required placeholder="0.00"></td>
        <td id="rightside"><input type="number" class="item-control small taxation" required placeholder="0.00"></td>
        <td id="rightside"><label class="item-control medium subtotal">₹ 0</label></td>
        <td id="close-btn">X</td>
    `;

    // tbody.appendChild(newRow);
    tbody.insertBefore(newRow, tbody.lastElementChild);

    const rowIndex = itemsData.length; // Index of the new row
    itemsData.push({ desc: '', qty: 0, price: 0,tax: 0, subtotal: 0 });

    // Add listeners for real-time calculation
    addCalculationListeners(newRow,rowIndex);
    saveItemsData();
    saveAllDetails() 
}

// row deleting on x button 

function RowDeletion(event) {
    if (event.target && event.target.id === 'close-btn') {
        const row = event.target.closest('tr'); // Find the closest table row
        if (row) {
            const rowIndex = Array.from(tbody.children).indexOf(row); 
            itemsData.splice(rowIndex, 1);
            row.remove(); // Remove the row from the table

            // Recalculate total after a row is removed
            calculateTotal();
            calculateTax();
            calculateSum();
            saveItemsData();
            saveAllDetails() 
        }
    }
}

// getting qty 

// function getAllQuantities() {
//     const rows = document.querySelectorAll('#itemTableBody .table-inputs');
//     const quantities = [];

//     rows.forEach(row => {
//         const qtyInput = row.querySelector('input.item-control.small');
//         if (qtyInput) {
//             quantities.push(qtyInput.value);
//         }
//     });

//     console.log('All quantities:', quantities);
//     return quantities;
// }

// console.log(itemsData);

// paymet details 
function storePaymentDetails() {

    const upiValue = upiInput.value.trim();
    const acnoValue = acnoInput.value.trim();
    const noteValue = note.value.trim();
    const termValue = term.value.trim();


    let selectedPaymentMethod = '';
    radioGroup.forEach(radio => {
        if (radio.checked) {
            selectedPaymentMethod = radio.value;
        }
    });

    // Store the values in an object
    const paymentDetails = {
        upi: upiValue,
        acno: acnoValue,
        paymentMethod: selectedPaymentMethod,
        notes :noteValue,
        terms : termValue
    };

    // Log the object or use it as needed
    // console.log('Stored Payment Details:', paymentDetails);

    // Example: Store in local storage
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

    return paymentDetails;
}


// EVENT LISTNERS 
fromDetails.addEventListener('click',() => {
    displayPopUp('company');
    submitPopup.removeEventListener('click', formSubmitClient);
    submitPopup.addEventListener('click',formSubmitComp);

});
todetails.addEventListener('click', () => {
    displayPopUp('client');
    submitPopup.removeEventListener('click', formSubmitComp);
    submitPopup.addEventListener('click', formSubmitClient);
});


closeFormBtn.addEventListener('click', function() {
    popupForm.style.display = 'none';
});

// Attach event listeners to existing rows for calculation
document.querySelectorAll('.table-inputs').forEach(row => addCalculationListeners(row));

add_item.addEventListener('click', () => {
    newRowCreation();
    calculateTotal();
    calculateTax();
    calculateSum();
    // getAllQuantities();
});

// document.addEventListener('DOMContentLoaded', calculateTotal);
// document.addEventListener('DOMContentLoaded', setDefaultDate);

// Function to set the default date to today and load the stored date if available
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    dateInput.value = today;
    localStorage.setItem('storedDate', today);
});

// Save the date whenever it changes
document.getElementById('date').addEventListener('change', () => {
    localStorage.setItem('storedDate', document.getElementById('date').value);
});
//     // Check if there's a stored date; if not, set to today's date
//     const storedDate = localStorage.getItem('storedDate');
//     if (storedDate) {
//         dateInput.value = storedDate;
//     } else {
//         dateInput.value = today;
//         localStorage.setItem('storedDate', today); // Store today's date as default
//     }
// });
// dateInput.addEventListener('change', saveDate); // Save the new date when user changes it

tbody.addEventListener('click', RowDeletion);

document.querySelector('.download').addEventListener('click', storePaymentDetails);


// Event listener for the submit button
submitPopup.addEventListener('click', (e) => {
    if (submitPopup.getAttribute('data-type') === 'company') {
        formSubmitComp(e);
    } 
    else if (submitPopup.getAttribute('data-type') === 'client') {
        formSubmitClient(e);
    }
});

downloadBtn.addEventListener('click',(event) => {
    event.preventDefault();
    const url = 'display.html';
    window.open(url, '_blank');
});

// popupForm.addEventListener('click', function(e) ){
//     if (e.target === popupForm) {
//         popupForm.style.display = 'none';
//     }
// }

document.querySelectorAll('.item-control').forEach(input => {
    input.addEventListener('input', saveItemsData);
});

// clearing form 
window.addEventListener('load', () => {
    localStorage.clear();
    // clearAllFields();
});

// function clearAllFields() {
//     const allInputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], textarea');
//     allInputs.forEach(input => {
//         input.value = '';
//     });

//     // Clear table rows
//     // const rows = document.querySelectorAll('#itemTableBody tr');
//     // rows.forEach(row => row.remove());

//     // Reset any summary values (e.g., totals)
//     resSubtotal.textContent = '₹ 0.00';
//     resTax.textContent = '₹ 0.00';
//     resTotal.textContent = '₹ 0.00';
// }