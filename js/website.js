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


// Function to generate a card element
function createCard(title, leftImage, centerImage, rightImage) {
  const cardContainer = document.getElementById("mycard-container");
  cardContainer.classList.add("col-lg-4", "col-md-6", "mb-4");

  const card = document.createElement("div");
  card.classList.add("card", "website-cards");

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

// Function to fetch and display cards from Firebase Realtime Database
function fetchCards(category) {
  const cardsRef = database.ref(category);

  cardsRef.on("value", (snapshot) => {
    const cards = snapshot.val();
    for (let card in cards) {
      const { title, status, leftImage, centerImage, rightImage } = cards[card];
      createCard(title, leftImage, centerImage, rightImage);
    }
  });
}

// Fetch cards for a specific category
fetchCards("ecommerce");
fetchCards("events");
fetchCards("tech");