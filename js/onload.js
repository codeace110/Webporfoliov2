document.addEventListener("DOMContentLoaded", function () {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAH0l7OBPQXGoEBLHRdrqXGshWHeACXvdE",
    authDomain: "webporfolio2.firebaseapp.com",
    projectId: "webporfolio2",
    storageBucket: "webporfolio2.appspot.com",
    messagingSenderId: "305672493039",
    appId: "1:305672493039:web:f4c244c785c0692f26c81a",
    measurementId: "G-S8RX0TRGZ7",
    databaseURL:
      "https://webporfolio2-default-rtdb.asia-southeast1.firebasedatabase.app",
  };

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Firebase Realtime Database
  var database = firebase.database();
  var starCountRef = database.ref('starCount');

  // Check if the visitor has already given a star
  var hasGivenStar = localStorage.getItem('hasGivenStar');
  if (hasGivenStar) {
    disableStarLink();
  }

  // Add event listener to the star link
  var starLink = document.getElementById('starLink');
  starLink.addEventListener('click', function() {
    if (hasGivenStar) {
      return; // Exit early if the visitor has already given a star
    }

    // Get the current star count from the badge
    var starBadge = document.getElementById('starBadge');
    var currentCount = parseInt(starBadge.innerText);

    if (isNaN(currentCount)) {
      currentCount = 0;
    }

    // Increment the star count by 1
    var newCount = currentCount + 1;

    // Update the badge text with the new count
    starBadge.innerText = newCount;

    // Store the new count in Firebase Realtime Database
    starCountRef.set(newCount)
      .then(function() {
        // Show a notification popup
        var notificationPopup = document.getElementById('notificationPopup');
        notificationPopup.style.display = 'block';

        // Disable the star link to prevent further clicks
        disableStarLink();

        // Set the flag in local storage indicating that the visitor has given a star
        localStorage.setItem('hasGivenStar', true);

        // Fade out the notification popup after 5 seconds
        setTimeout(function() {
          notificationPopup.style.display = 'none';
        }, 5000);
      })
      .catch(function(error) {
        console.log('Error storing star count:', error);
      });
  });

  // Retrieve the star count from Firebase Realtime Database on page load
  starCountRef.once('value')
    .then(function(snapshot) {
      var starCount = snapshot.val();
      var starBadge = document.getElementById('starBadge');
      starBadge.innerText = starCount;
    })
    .catch(function(error) {
      console.log('Error retrieving star count:', error);
    });

  function disableStarLink() {
    starLink.removeEventListener('click', handleClick);
    starLink.classList.add('disabled');
  }
});