// get data of category buttons
const getCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categoriesArray = data.data;
    displayCategories(categoriesArray);
    displayCards();
}
getCategory();

// display category buttons 
const displayCategories = (categoriesArray) => {
    const categoryButtonsContainer = document.getElementById('category-buttons-container');
    categoriesArray.forEach(item => {
        const categoryButton = document.createElement('button');
        categoryButton.setAttribute('onclick', `displayCards(${item.category_id})`);
        categoryButton.classList.add('btn', 'normal-case', 'hover:bg-[#FF1F3D]', 'hover:text-white', 'focus:bg-[#FF1F3D]', 'focus:text-white');
        categoryButton.innerText = `${item.category}`;
        categoryButtonsContainer.appendChild(categoryButton);
    })
}

//Display cards
const displayCards = async (categoryId = '1000') => {
    document.getElementById('cards-container').innerHTML = '';
    document.getElementById('cards-container').classList.add('grid')
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const arrayOfItems = data.data;
    if (arrayOfItems.length === 0) {
        document.getElementById('cards-container').classList.remove('grid')
        document.getElementById('cards-container').innerHTML = `
        <figure class="w-3/4 mx-auto mt-20">
        <img class="mx-auto" src="images/Icon.png" alt="">
        <figcaption class="text-center font-extrabold text-4xl">No Data Found!</figcaption>
        </figure>
        `
    }
    arrayOfItems.forEach(item => {
        const cardsContainer = document.getElementById('cards-container');
        const card = document.createElement('div');
        card.classList.add('card', 'rounded-md', 'card-compact', 'bg-base-100');
        card.innerHTML = `<figure class="relative">
        <img class="w-full rounded-md" src="${item.thumbnail}" alt="">
        
        <p class="absolute bottom-2 right-4 bg-slate-950 px-4 text-white rounded opacity-75">${Math.floor(item.others.posted_date/3600)}hrs ${parseInt((item.others.posted_date%3600)/60)}min ago</p>

        </figure>
        <div class="card-body">
          <div class="flex">
            <img class="w-11 h-11 rounded-full" src="${item.authors[0].profile_picture}" alt="">
            <div class="ml-2">
            <h3 class ="font-bold">${item.title}</h3>
            <p class="my-3">
            ${item.authors[0].profile_name} <span>${item.authors[0].verified === true ? `<img class="inline" src="images/fi_10629607.svg" alt="">` : ''}</span>
            </p>
            <p>${item.others.views} views</p>
            </div>
          </div>
        </div>
        `
        cardsContainer.appendChild(card);
        
    })
    document.getElementById('sort-by-views-button').setAttribute('onclick', `DisplayCardUsingSortByView(${categoryId})`)
}


//Sort by view
const DisplayCardUsingSortByView = async (categoryId = '1000') => {
    document.getElementById('cards-container').innerHTML = '';
    document.getElementById('cards-container').classList.add('grid')
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const arrayOfItems = data.data;
    const sortedArray = arrayOfItems.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
    if (arrayOfItems.length === 0) {
        document.getElementById('cards-container').classList.remove('grid')
        document.getElementById('cards-container').innerHTML = `
        <figure class="w-3/4 mx-auto mt-20">
        <img class="mx-auto" src="images/Icon.png" alt="">
        <figcaption class="text-center font-extrabold text-4xl">No Data Found!</figcaption>
        </figure>
        `
    }
    sortedArray.forEach(item => {
        const cardsContainer = document.getElementById('cards-container');
        const card = document.createElement('div');
        card.classList.add('card', 'rounded-md', 'card-compact', 'bg-base-100');
        card.innerHTML = `<figure class="relative">
        <img class="w-full rounded-md" src="${item.thumbnail}" alt="">

        <p class="absolute bottom-2 right-4 bg-slate-950 px-4 text-white rounded opacity-75">${Math.floor(item.others.posted_date/3600)}hrs ${parseInt((item.others.posted_date%3600)/60)}min ago</p>

        </figure>
        <div class="card-body">
          <div class="flex">
            <img class="w-11 h-11 rounded-full" src="${item.authors[0].profile_picture}" alt="">
            <div class="ml-2">
            <h3 class ="font-bold">${item.title}</h3>
            <p class="my-3">
            ${item.authors[0].profile_name} <span>${item.authors[0].verified === true ? `<img class="inline" src="images/fi_10629607.svg" alt="">` : ''}</span>
            </p>
            <p>${item.others.views} views</p>
            </div>
          </div>
        </div>`
        cardsContainer.appendChild(card);
    }) 
}
