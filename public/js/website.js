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
  card.classList.add("card", "col-lg-4", "col-md-6", "mb-4", "websites-card");

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
  cardStatus.classList.add("card-text", "card-status");
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
fetchCards("all");

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

let currentPage = 1;
const cardsPerPage = 6;

function renderPaginationButtons(totalCards, category) {
  const paginationContainer = document.getElementById("pagination-container");
  if (!paginationContainer) {
    return; // Exit function if pagination container is not found
  }
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalCards / cardsPerPage);
  for (let i = 0; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");

    const pageLink = document.createElement("a");
    pageLink.classList.add("page-link");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.addEventListener("click", () => {
      currentPage = i;
      fetchCards(category);
    });

    if (i === currentPage) {
      pageItem.classList.add("active");
    }

    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }
}


function fetchCards(category) {
  const cardsRef = database.ref(category);

  cardsRef.on("value", (snapshot) => {
    const cards = snapshot.val();
    const totalCards = Object.keys(cards).length;
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const cardsToShow = Object.values(cards).slice(startIndex, endIndex);

    clearCards();
    for (let card of cardsToShow) {
      const { title, status, leftImage, centerImage, rightImage } = card;
      createCard(title, status, leftImage, centerImage, rightImage);
    }

    // Render pagination buttons
    renderPaginationButtons(totalCards, category);
  });
}

const paginationContainer = document.getElementById("pagination-container");
const prevButton = paginationContainer.querySelector(".fa-angles-left");
const nextButton = paginationContainer.querySelector(".fa-angles-right");

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCards(getActiveCategory());
  }
});

nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    fetchCards(getActiveCategory());
  }
});

