// Helper function to get a random integer between two values, inclusive
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadRandomImageAndMetadata() {
    const totalImages = 1000; // Update this to the actual number of images
    const randomIndex = getRandomInt(1, totalImages);
    const imageFilename = `img${randomIndex}.png`;
    const jsonFilename = `img${randomIndex}.json`;

    const imageUrl = `images/${imageFilename}`;
    const jsonUrl = `metadata/${jsonFilename}`;

    // Update the image src
    const imageElement = document.getElementById('randomImage');
    imageElement.src = imageUrl;
    imageElement.alt = `Random Image ${randomIndex}`;

    // Fetch the corresponding JSON metadata
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Update the DOM with the metadata
            document.querySelector('.details h2').textContent = data.name;

            const listItems = document.querySelectorAll('.details ul li');

            listItems.forEach((li, index) => {
                const attribute = data.attributes[index];
                const spanElement = li.querySelector('span');
                spanElement.textContent = attribute.rarity;
            });
        })
        .catch(error => {
            console.error('Error fetching metadata:', error);
        });
}

// Load a random image and metadata when the page loads
window.onload = loadRandomImageAndMetadata;
