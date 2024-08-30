const fromDetails = document.getElementById('from-details');
const todetails = document.getElementById('to-details');
const popupForm = document.getElementById('popupForm');
const closeFormBtn = document.getElementById('closeFormBtn');
const submitPopup = document.getElementById('submit-btn')
const add_item = document.querySelector('.add-item');

const tbody = document.getElementById('itemTableBody');
const xbtn = document.getElementById('close-btn');

let totalsub = 0;
let totalTax = 0;

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
function displayPopUp() {
    clearFormInputs();
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

        console.log( 'company details :',companyDetails);
    } else if(type === 'client') {
        clientsDetails ={
            name: name.value,
            address:address.value,
            email:email.value,
            phone:phone.value,
        }

        console.log( 'client details :',clientsDetails);
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
    }
    descInput.addEventListener('input', calculateSubtotal);
    qtyInput.addEventListener('input', calculateSubtotal);
    priceInput.addEventListener('input', calculateSubtotal);
    taxInput.addEventListener('input', calculateSubtotal);

    
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
        <td id="first-inp"><input type="text" class="item-control wide description"></td>
        <td id="rightside"><input type="text" class="item-control small qty"></td>
        <td id="rightside"><input type="text" class="item-control small price"></td>
        <td id="rightside"><input type="text" class="item-control small taxation"></td>
        <td id="rightside"><label class="item-control medium subtotal">₹ 0</label></td>
        <td id="close-btn">X</td>
    `;

    // tbody.appendChild(newRow);
    tbody.insertBefore(newRow, tbody.lastElementChild);

    const rowIndex = itemsData.length; // Index of the new row
    itemsData.push({ desc: '', qty: 0, price: 0,tax: 0, subtotal: 0 });

    // Add listeners for real-time calculation
    addCalculationListeners(newRow,rowIndex);
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

console.log(itemsData);

// EVENT LISTNERS 
fromDetails.addEventListener('click',() => {
    displayPopUp();
    submitPopup.removeEventListener('click', formSubmitClient);
    submitPopup.addEventListener('click',formSubmitComp);

});
todetails.addEventListener('click', () => {
    displayPopUp();
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

tbody.addEventListener('click', RowDeletion);

// popupForm.addEventListener('click', function(e) ){
//     if (e.target === popupForm) {
//         popupForm.style.display = 'none';
//     }
// }