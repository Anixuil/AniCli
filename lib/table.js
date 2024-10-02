const fs = require('fs');
const path = require('path');

// Function to generate a table from the template
function generateTable(template) {
    const headers = ['Template Name', 'Owner'];
    const rows = Object.keys(template).map(key => {
        return [key, template[key].owner];
    });

    // Print headers
    console.log(headers.join('\t\t'));

    // Print rows
    rows.forEach(row => {
        console.log(row.join('\t'));
    });
}

// Export the generateTable function
module.exports = (template) => {
    generateTable(template);
    process.exit();
}