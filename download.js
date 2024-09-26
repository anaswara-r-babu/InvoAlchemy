// // // let fromName;  // Declare fromName globally

// // //     document.getElementById('from-details-form').addEventListener('submit', function(event) {
// // //         event.preventDefault();  // Prevent form submission from refreshing the page
        
// // //         // Get the value of the From Name input field
// // //         fromName = document.getElementById('fromName').value;

// // //         // Update the content dynamically if needed
// // //         document.getElementById('name-placeholder').textContent = fromName;

// // //         // Display the download button after form submission
// // //         document.getElementById('downloadBtn').style.display = 'inline';
// // //     });

// //     // Download the content as an HTML file with the fromName
// //     document.getElementById('downloadBtn').addEventListener('click', function() {

// //         console.log('helllo');
        
// //         // Get the content of the div or entire page body
// //         const content = document.getElementById('invoice-container').outerHTML;
        
// //         // Create a Blob from the content
// //         const blob = new Blob([content], { type: 'text/html;charset=utf-8' });

// //         // Create a temporary link element
// //         const link = document.createElement('a');
// //         link.href = URL.createObjectURL(blob);

// //         // Set the download attribute to the dynamic file name
// //         const filename = fromName ? `${fromName}_invoice.html` : 'invoice.html';  // Use fromName or a default name
// //         link.download = filename;

// //         // Append the link to the body (required for Firefox)
// //         document.body.appendChild(link);

// //         // Programmatically click the link to trigger the download
// //         link.click();

// //         // Remove the link from the document
// //         document.body.removeChild(link);
// //     });


// document.getElementById('downloadBtn').addEventListener('click', function() {
//     // Get the content of the div or the entire page body
//     const content = document.getElementById('invoice-container').outerHTML;

//     const cssLink = '<link rel="stylesheet" href="displayStyle.css">';

//       // Create the full HTML structure
//       const fullHTML = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Display</title>
//           ${cssLink}
//       </head>
//       <body>
//           ${content}
//       </body>
//       </html>`;
  
//       // Create a Blob from the full HTML structure
//       const blob = new Blob([fullHTML], { type: 'text/html' });

//     // Create a temporary link element
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);

//     // Set the download attribute with a default filename
//     link.download = 'display.html';

//     // Append the link to the body (required for Firefox)
//     document.body.appendChild(link);

//     // Programmatically click the link to trigger the download
//     link.click();

//     // Remove the link from the document
//     document.body.removeChild(link);
// });


document.getElementById('downloadBtn').addEventListener('click', function() {
    // Get the content you want to download
    const element = document.getElementById('invoice-container');

    // Configure html2pdf options
    const options = {
        // margin:       0.5,          // Margin around the content
        filename:     'display.pdf', // Name of the downloaded file
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // Higher scale for better resolution
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' } // PDF format and orientation
    };

    // Trigger the download using html2pdf
    html2pdf().from(element).set(options).save();
});