// Set the base URL for the API
const baseUrl = 'https://platzi-avo.vercel.app'

// Construct the full URL for the API endpoint
const url = `${baseUrl}/api/avo`;

const appNode = document.querySelector('#app');

// Create a function that formats prices as USD
const newPrice = price => {
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: 'currency',
        currency: 'USD'
    }).format(price);

    return newPrice;
}

// Define an asynchronous function to fetch data from the API
async function fetchData(apiUrl){
    // Fetch data from the API endpoint
    const response = await window.fetch(apiUrl);

    // Extract JSON data from the response
    const data = await response.json();

    // Create a new DocumentFragment to hold the generated HTML
    const fragment = new DocumentFragment();

    // Loop through each avocado in the data
    data.data.forEach(element => {
        // Create a title element for the avocado
        const title = document.createElement('h2');
        title.textContent = element.name;
        title.className = 'h-8 bg-gray-200 col-span-2 rounded';

        // Create a price element for the avocado, using the newPrice function
        const price = document.createElement('div');
        price.textContent = newPrice(element.price);
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
        img.src = `${baseUrl}${element.image}`;
        img.style.width = '100%';
        img.style.objectFit = 'cover';

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

// Call the fetchData function with the URL for the avocado API endpoint
fetchData(url);
