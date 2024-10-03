
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


// document.getElementById('downloadBtn').addEventListener('click', function() {
//     // Get the content you want to download
//     const element = document.getElementById('invoice-container');

//     // Configure html2pdf options
//     const options = {
//         // margin:       0.5,          // Margin around the content
//         filename:     `${companyName}.pdf`, // Name of the downloaded file
//         image:        { type: 'jpeg', quality: 0.98 },
//         html2canvas:  { scale: 2 }, // Higher scale for better resolution
//         jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' } // PDF format and orientation
//     };

//     // Trigger the download using html2pdf
//     html2pdf().from(element).set(options).save();
// });


// document.getElementById('downloadBtn').addEventListener('click', () => {
//     // Load the jsPDF module
//     const { jsPDF } = window.jspdf;

//     // Create a new PDF document
//     const doc = new jsPDF();

//     // Get the company name
//     const companyDetails = JSON.parse(localStorage.getItem('companyDetails'));
//     const companyName = companyDetails ? companyDetails.name : 'Invoice';

//     // Add content to the PDF (you can customize this as needed)
//     doc.text('Invoice', 10, 10);
    
//     // Example of adding other content
//     doc.text(`Company Name: ${companyName}`, 10, 20);
    
//     // You can add more content here based on what you want in the PDF
//     doc.text(`Date: ${document.getElementById('date').textContent}`, 10, 30);

//     // Save the PDF with the company name as filename
//     doc.save(`${companyName}.pdf`);
// });

document.getElementById('downloadBtn').addEventListener('click', () => {
    // Get the company details for the filename
    const companyDetails = JSON.parse(localStorage.getItem('companyDetails'));
    const companyName = companyDetails ? companyDetails.name : 'Invoice';

    //element to be converted to PDF (e.g., a div with id 'pdfContent')
    const element = document.getElementById('invoice-container');

    // Set up options for html2pdf
    const options = {
        filename:     `${companyName}_Invoice.pdf`, 
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    // Generate and save the PDF
    html2pdf().from(element).set(options).save();
});


// document.getElementById('downloadBtn').addEventListener('click', () => {
//     // Load the jsPDF and html2canvas libraries
//     const { jsPDF } = window.jspdf;

//     // Get the company details for the filename
//     const storedCompanyDetails = localStorage.getItem('companyDetails');
//     const companyDetails = storedCompanyDetails ? JSON.parse(storedCompanyDetails) : {};
//     const companyName = companyDetails.name || 'Invoice';

//     // Use html2canvas to capture the content of the display page
//     html2canvas(document.body, { scale: 2 }).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');

//         // Create a new jsPDF document
//         const doc = new jsPDF();

//         // Add the image to the PDF
//         doc.addImage(imgData, 'PNG', 0, 0);

//         // Save the PDF with the company name as filename
//         doc.save(`${companyName}.pdf`);
//     });
// });