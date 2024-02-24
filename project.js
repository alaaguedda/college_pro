

document.getElementById('createBtn').addEventListener('click', openPopup);

// Load cards from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadCards);

function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
//----------------------------------------------------------

function loadCards() {
    const savedCards = localStorage.getItem('realEstateCards');

    if (savedCards) {
        const parsedCards = JSON.parse(savedCards);

        // Clear the cards container before adding cards
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = '';

        // Loop through each card and create DOM elements
        parsedCards.forEach(cardData => {
            const card = createCardElement(
                cardData.name,
                cardData.location,
                cardData.price,
                cardData.id,
                cardData.imageFile
            );
            cardsContainer.appendChild(card);
        });
    }
}

// ... (Your existing functions)


function searchByLocation() {
    // Get the search input value
    const searchValue = document.getElementById('locationSearch').value.toLowerCase();

    // Get all cards
    const cards = document.querySelectorAll('.card');

    // Loop through each card and check if the location matches the search value
    cards.forEach(card => {
        const locationText = card.querySelector('p:nth-child(2)').textContent.toLowerCase(); // Adjust based on your HTML structure
        const cardMatchesSearch = locationText.includes(searchValue);

        // Show or hide the card based on the search result
        card.style.display = cardMatchesSearch ? 'block' : 'none';
    });
}

// ... (Your existing functions)




//-------------------------------------------------------
function submitForm() {
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;

    // Get the image file input
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0]; // Assuming only one file is selected

    // Create a new card with a unique ID and include the image
    const cardId = Date.now().toString();
    const card = createCardElement(name, location, price, cardId, imageFile);

    
//------------------------------------------


fetch('http://localhost/project%20repo/project.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `addCard=true&name=${name}&location=${location}&price=${price}&image=${image}`,
})
.then(response => response.text())
.then(data => {
    console.log(data); // Handle the response as needed
})
.catch(error => console.error('Error:', error));



//-----------------------------------------------
    // Add the card to the cards container
    document.getElementById('cardsContainer').appendChild(card);

    // Save card data to local storage
    saveCardToLocalStorage({ id: cardId, name, location, price, imageFile });

    // Close the popup
    closePopup();
    
    // Clear the form
    document.getElementById('estateForm').reset();
}


function deleteCard(button) {
    const cardElement = button.parentNode;
    const cardId = cardElement.dataset.cardId;

    // Check if the user is the admin or the creator of the card
    if (isAdmin() || isCardCreatedByUser(cardId)) {
        // Remove the card from the DOM
        cardElement.remove();

        // Remove the card from local storage
        removeCardFromLocalStorage(cardId);
    } else {
        alert('You do not have permission to delete this card.');
    }
}

function isAdmin() {
    // Implement your logic to determine if the user is an admin
    // For example, you can use a role-based system or check user credentials
    return true; // Replace with your actual admin check
}

function isCardCreatedByUser(cardId) {
    const savedCards = localStorage.getItem('realEstateCards');
    
    if (savedCards) {
        const parsedCards = JSON.parse(savedCards);
        const matchingCard = parsedCards.find(card => card.id === cardId);
        // Check if the card exists and was created by the current user
        return matchingCard && matchingCard.creator === getCurrentUserId();
    }

    return false;
}

function getCurrentUserId() {
    // Implement your logic to get the current user's ID
    // This could be obtained from the authentication system
    return 'user123'; // Replace with your actual user ID retrieval
}

function removeCardFromLocalStorage(cardId) {
    let savedCards = localStorage.getItem('realEstateCards') || '[]';
    savedCards = JSON.parse(savedCards);
    
    // Remove the card from the saved cards array
    const updatedCards = savedCards.filter(card => card.id !== cardId);
    
    // Update local storage with the modified array
    localStorage.setItem('realEstateCards', JSON.stringify(updatedCards));
}

// Your existing functions...

function createCardElement(name, location, price, cardId, imageFile) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardId = cardId;

    // Include the image in the card if provided
    if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        card.innerHTML = `
            <img src="${imageUrl}" alt="Estate Image" style="max-width: 100%; height: auto;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Price:</strong> $${price}</p>
            <button onclick="deleteCard(this)">Delete</button>
            <button onclick="buyEstate(this)">Buy</button>
        `;
    } else {
        card.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Price:</strong> $${price}</p>
            <button onclick="deleteCard(this)">Delete</button>
            <button onclick="buyEstate(this)">Buy</button>
        `;
    }

    return card;
}


function openSignupPopup() {
    document.getElementById('signupPopup').style.display = 'block';
}

function closeSignupPopup() {
    document.getElementById('signupPopup').style.display = 'none';
}

function submitSignupForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost/project%20repo/project.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `signup=true&username=${username}&email=${email}&password=${password}&phone=${phone}`,
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle the response as needed
    })
    .catch(error => console.error('Error:', error));
}

    // Implement your logic to save the user data (e.g., to local storage or send to a server)

    // Close the signup popup
    closeSignupPopup();

    // Clear the signup form
    document.getElementById('signupForm').reset();

