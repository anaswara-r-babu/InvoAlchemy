const fromDetails = document.getElementById('from-details');
const todetails = document.getElementById('to-details');
const popupForm = document.getElementById('popupForm');
const closeFormBtn = document.getElementById('closeFormBtn');

// function displayPopUp() {
//     popupForm.style.display = 'flex';
// }

// EVENT LISTNERS 
fromDetails.addEventListener('click',() => {popupForm.style.display = 'flex'; });
todetails.addEventListener('click',() => {popupForm.style.display = 'flex'; });


closeFormBtn.addEventListener('click', function() {
    popupForm.style.display = 'none';
});



// popupForm.addEventListener('click', function(e) ){
//     if (e.target === popupForm) {
//         popupForm.style.display = 'none';
//     }
// }