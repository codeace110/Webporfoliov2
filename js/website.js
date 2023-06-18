

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

// Get a reference to the database
const database = firebase.database();

function createCard(title, status, leftImage, centerImage, rightImage) {
  const cardContainer = document.getElementById("mycard-container");

  const card = document.createElement("div");
  card.classList.add("card", "col-lg-4", "col-md-6", "mb-4");

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("card-img-wrapper");
  card.appendChild(imgWrapper);

  const leftImg = document.createElement("img");
  leftImg.src = leftImage;
  leftImg.classList.add("card-img-left");
  leftImg.alt = "Left Image";
  imgWrapper.appendChild(leftImg);

  const centerImg = document.createElement("img");
  centerImg.src = centerImage;
  centerImg.classList.add("card-img-center");
  centerImg.alt = "Center Image";
  imgWrapper.appendChild(centerImg);

  const rightImg = document.createElement("img");
  rightImg.src = rightImage;
  rightImg.classList.add("card-img-right");
  rightImg.alt = "Right Image";
  imgWrapper.appendChild(rightImg);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;
  cardBody.appendChild(cardTitle);

  const cardStatus = document.createElement("p");
  cardStatus.classList.add("card-text");
  cardStatus.textContent = status;
  cardBody.appendChild(cardStatus);

  card.appendChild(cardBody);

  cardContainer.appendChild(card);
}
// Function to clear card container
function clearCards() {
  const cardContainer = document.getElementById("mycard-container");
  cardContainer.innerHTML = "";
}

// Function to filter cards based on category
function filterCards(category) {
  clearCards();
  fetchCards(category);
}

// Function to fetch and display cards from Firebase Realtime Database
function fetchCards(category) {
  const cardsRef = database.ref(category);

  cardsRef.on("value", (snapshot) => {
    const cards = snapshot.val();
    for (let card in cards) {
      const { title, status, leftImage, centerImage, rightImage } = cards[card];
      createCard(title, status, leftImage, centerImage, rightImage);
    }
  });
}




// Fetch cards for the initial "All" category
fetchCards("ecommerce");
// Function to filter cards based on category
function filterCards(categoryButton) {
  // Remove "active" class from all category buttons
  const categoryButtons = document.getElementsByClassName("category-button");
  for (let i = 0; i < categoryButtons.length; i++) {
    const button = categoryButtons[i];
    button.classList.remove("active");
  }

  // Add "active" class to the selected category button
  categoryButton.classList.add("active");

  // Clear cards and fetch cards based on the selected category
  clearCards();
  const category = categoryButton.textContent.toLowerCase();
  fetchCards(category);
}


