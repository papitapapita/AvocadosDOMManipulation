const baseUrl = 'https://platzi-avo.vercel.app'
const url = `${baseUrl}/api/avo`;
const appNode = document.querySelector('#app');

async function fetchData(apiUrl){
    const response = await window.fetch(apiUrl);
    const data = await response.json();
    //const listItems = [];
    const fragment = new DocumentFragment();

    data.data.forEach(element => {
        const img = document.createElement('img');
        img.src = `${baseUrl}${element.image}`;

        const title = document.createElement('h2');
        title.textContent = element.name;

        const price = document.createElement('div');
        price.textContent = element.price;

        const container = document.createElement('div');
        container.append(img, title, price);

        fragment.append(container);
    });

    appNode.append(fragment);
}

fetchData(url);