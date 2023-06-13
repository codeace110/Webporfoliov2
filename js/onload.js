document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    import { initializeApp, getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
    import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
  
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyAH0l7OBPQXGoEBLHRdrqXGshWHeACXvdE",
   authDomain: "webporfolio2.firebaseapp.com",
   projectId: "webporfolio2",
   storageBucket: "webporfolio2.appspot.com",
   messagingSenderId: "305672493039",
   appId: "1:305672493039:web:f4c244c785c0692f26c81a",
   measurementId: "G-S8RX0TRGZ7"
 };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Cloud Storage
const storage = firebase.storage();
const starCountRef = storage.ref().child('starCount');

// Add event listener to the star link
var starLink = document.getElementById('starLink');
starLink.addEventListener('click', function() {
  // Get the current star count from the badge
  var starBadge = document.getElementById('starBadge');
  var currentCount = parseInt(starBadge.innerText);

  // Increment the star count by 1
  var newCount = currentCount + 1;

  // Update the badge text with the new count
  starBadge.innerText = newCount;

  // Store the new count in Firebase Cloud Storage
  starCountRef.putString(newCount.toString())
    .then(function() {
      // Show a notification popup
      var notificationPopup = document.getElementById('notificationPopup');
      notificationPopup.style.display = 'block';
    })
    .catch(function(error) {
      console.log('Error storing star count:', error);
    });
});

// Retrieve the star count from Firebase Cloud Storage on page load
starCountRef.getDownloadURL()
  .then(function(url) {
    return fetch(url);
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(starCount) {
    var starBadge = document.getElementById('starBadge');
    starBadge.innerText = starCount;
  })
  .catch(function(error) {
    console.log('Error retrieving star count:', error);
  });