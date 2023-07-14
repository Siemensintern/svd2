// details.js

// You can add any custom JavaScript code here that enhances the functionality of the details page.
// This is just a basic example.

// Example code for displaying an alert with the item ID
function showAlert(itemId) {
    alert('Item ID: ' + itemId);
  }
  
  // Example code for adding event listeners to elements
  document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the item ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

  });
  