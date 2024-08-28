const fromDetails = document.getElementById('from-details');
const todetails = document.getElementById('to-details');
const popupForm = document.getElementById('popupForm');
const closeFormBtn = document.getElementById('closeFormBtn');
const submitPopup = document.getElementById('submit-btn')
const add_item = document.querySelector('.add-item');

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


function newRowCreation() {
    const tbody = document.getElementById('itemTableBody');
    const newRow = document.createElement('tr');
    newRow.classList.add('table-inputs');

    newRow.innerHTML = `
        <td id="first-inp"><input type="text" class="item-control wide"></td>
        <td id="rightside"><input type="text" class="item-control small"></td>
        <td id="rightside"><input type="text" class="item-control small"></td>
        <td id="rightside"><input type="text" class="item-control small"></td>
        <td id="rightside"><label class="item-control medium">₹ 0</label></td>
        <td id="close-btn">X</td>
    `;

    tbody.insertBefore(newRow, tbody.lastElementChild);
}


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

add_item.addEventListener('click',newRowCreation);

// popupForm.addEventListener('click', function(e) ){
//     if (e.target === popupForm) {
//         popupForm.style.display = 'none';
//     }
// }