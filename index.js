// Set the base URL for the API
const baseUrl = 'https://platzi-avo.vercel.app'

// Create a function that formats prices as USD
const newPrice = price => {
    return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Fetch data from the API
async function fetchAvoData() {
    try {
        // Fetch data from the API endpoint
        const response = await fetch(`${baseUrl}/api/avo`);
        // Extract JSON data from the response
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

// Render the avocados to the page
function renderAvocados(avocados){
    const appNode = document.querySelector('#app');
    // Create a new DocumentFragment to hold the generated HTML
    const fragment = new DocumentFragment();

    // Loop through each avocado in the data
    avocados.forEach(avocado => {
        // Create a title element for the avocado
        const title = document.createElement('h2');
        title.textContent = avocado.name;
        title.className = 'h-8 bg-gray-200 col-span-2 rounded';

        // Create a price element for the avocado, using the newPrice function
        const price = document.createElement('div');
        price.textContent = newPrice(avocado.price);
        price.className = 'h-8 bg-gray-200 rounded';

        // Create a container for the title and price elements
        const titlePriceContainer = document.createElement('div');
        titlePriceContainer.className = 'grid grid-cols-2 gap-4';
        titlePriceContainer.append(title, price);

        // Create a container for the titlePriceContainer element
        const tiPrCoContainer = document.createElement('div');
        tiPrCoContainer.className = 'p-3 h-';
        tiPrCoContainer.append(titlePriceContainer);

        // Create an image element for the avocado
        const img = document.createElement('img');
        img.src = `${baseUrl}${avocado.image}`;
        img.style = 'width: 100%;object-fit:cover;';

        // Create a figure element to hold the image element
        const figure = document.createElement('figure');
        figure.className = 'h-48 p-3 overflow-hidden bg-gray-200';
        figure.append(img);

        // Create a container for the figure and tiPrCoContainer elements
        const container = document.createElement('div');
        container.className = 'mx-auto bg-white rounded shadow-lg w-96 rounded-2xl';
        container.append(figure, tiPrCoContainer);

        // Add the container to the DocumentFragment
        fragment.append(container);
    });

    // Append the DocumentFragment to the appNode element in the HTML page
    appNode.append(fragment);
}

// Initialize the app
async function init(){
    const avocados = await fetchAvoData();
    renderAvocados(avocados.data);
}

init();
