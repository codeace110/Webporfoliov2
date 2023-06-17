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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service and database service
var storage = firebase.storage();
var database = firebase.database();

// Reference to the "cards" collection in your Firebase Realtime Database
var cardsRef = firebase.database().ref('cards');

// Fetch the data
cardsRef.once('value')
.then(function(snapshot) {
  // Process the snapshot and populate the cards
  var cardsData = snapshot.val();
  populateCards(cardsData, 'All');
})
.catch(function(error) {
  console.log('Error fetching data:', error);
});

function populateCards(cardsData, category) {
var cardContainer = document.querySelector('.row');
cardContainer.innerHTML = ''; // Clear existing cards

// Filter the card data based on the selected category
var filteredCards = Object.values(cardsData).filter(function(card) {
  return card.category === category || category === 'All';
});

// Iterate over the filtered card data
filteredCards.forEach(function(card) {
  // Create the card HTML elements
  var cardHtml = `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card website-cards">
        <div class="card-img-wrapper">
          <img src="${card.leftImageUrl}" class="card-img-left" alt="Left Image" />
          <img src="${card.centerImageUrl}" class="card-img-center" alt="Center Image" />
          <img src="${card.rightImageUrl}" class="card-img-right" alt="Right Image" />
        </div>
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
        </div>
      </div>
    </div>
  `;

  // Append the card to the container
  cardContainer.innerHTML += cardHtml;
});
}

// Handle category selection
$(".chip").click(function() {
var selectedCategory = $(this).text();
cardsRef.once('value')
  .then(function(snapshot) {
    var cardsData = snapshot.val();
    populateCards(cardsData, selectedCategory);
  })
  .catch(function(error) {
    console.log('Error fetching data:', error);
  });
});