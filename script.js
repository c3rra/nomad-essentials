const options = document.querySelectorAll('.options li');
const cards = document.querySelectorAll('.card');

// Convert cards to an array
const cardArray = Array.from(cards);

const cardsPerPage = 8; // Adjust this value as needed
let currentPage = 1;
let totalPages = 1;
let filteredCards = cardArray;

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initial shuffle
shuffleArray(cardArray);

// Function to display cards based on current page and filter
function displayCards() {
  const content = document.querySelector('.content');
  content.innerHTML = '';

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const paginatedCards = filteredCards.slice(startIndex, endIndex);

  paginatedCards.forEach(card => content.appendChild(card));

  updatePagination(); // Update pagination after displaying cards
}

// Function to create pagination elements
function createPagination(totalCards) {
  const paginationContainer = document.querySelector('.pagination .page-numbers');
  paginationContainer.innerHTML = '';

  totalPages = Math.ceil(totalCards / cardsPerPage);

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.textContent = i;
      pageLink.classList.add('page-number');
      pageLink.addEventListener('click', () => {
        currentPage = i;
        displayCards();
      });
      if (i === currentPage) {
        pageLink.classList.add('active');
      }
      paginationContainer.appendChild(pageLink);
    }
  } else {
    // Hide pagination if only one page
    paginationContainer.style.display = 'none';
  }
}

// Update pagination elements (previous/next buttons and page numbers)
function updatePagination() {
  const prevButton = document.querySelector('.prev-page');
  const nextButton = document.querySelector('.next-page');

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  const pageNumbers = document.querySelectorAll('.page-number');
  pageNumbers.forEach(pageLink => {
    pageLink.classList.remove('active');
  });
  pageNumbers[currentPage - 1].classList.add('active');
}

// Filter cards based on category and update display
options.forEach(option => {
  option.addEventListener('click', () => {
    const selectedCategory = option.textContent;
    currentPage = 1;
    if (selectedCategory === 'View All') {
      shuffleArray(cardArray); // Shuffle cards when "View All" is selected
    }

    filteredCards = cardArray.filter(card => selectedCategory === 'View All' || card.dataset.category === selectedCategory);

    displayCards();
    updatePagination();
    // Add or remove the 'active' and 'selected' classes to the clicked option
    options.forEach(opt => {
      opt.classList.remove('active', 'selected');
    });
    option.classList.add('active', 'selected');
  });
});

// Initial card display
createPagination(cardArray.length);
displayCards(cardArray.slice(0, cardsPerPage));

// Event listeners for previous and next buttons
const prevButton = document.querySelector('.prev-page');
const nextButton = document.querySelector('.next-page');

prevButton.addEventListener('click', () => {
  currentPage = 1;
  displayCards();
});

nextButton.addEventListener('click', () => {
  currentPage = totalPages;
  displayCards();
});

// ------------------------------------------Burger Menu Stuff!
const burgerMenu = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.mobile-nav');

burgerMenu?.addEventListener('click', (event) => {
  // Toggle the 'active' class on mobileNav
  mobileNav.classList.toggle('active');
});

function myFunction(x) {
  x.classList.toggle("change");
  document.querySelector('.mobile-nav').classList.toggle('active');

  // Conditionally show/hide the mobileNav based on the 'active' class
  if (mobileNav.classList.contains('active')) {
    mobileNav.style.display = 'block'; // Show the menu
  } else {
    mobileNav.style.display = 'none'; // Hide the menu
  }
}

