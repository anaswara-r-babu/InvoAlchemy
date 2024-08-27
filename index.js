const fromDetails = document.getElementById('from-details');
const todetails = document.getElementById('to-details');
const popupForm = document.getElementById('popupForm');
const closeFormBtn = document.getElementById('closeFormBtn');

const add_item = document.querySelector('.add-item');

// function displayPopUp() {
//     popupForm.style.display = 'flex';
// }


// FUNC 
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
fromDetails.addEventListener('click',() => {popupForm.style.display = 'flex'; });
todetails.addEventListener('click',() => {popupForm.style.display = 'flex'; });


closeFormBtn.addEventListener('click', function() {
    popupForm.style.display = 'none';
});

add_item.addEventListener('click',newRowCreation);


// popupForm.addEventListener('click', function(e) ){
//     if (e.target === popupForm) {
//         popupForm.style.display = 'none';
//     }
// }