async function fetchAllProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products'); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data

        const productCardContainers = document.getElementById('productCardRow')
        productCardContainers.innerHTML=''
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('cardcovering')
            postElement.classList.add('col-sm-12')
            postElement.classList.add('col-md-6')
            postElement.classList.add('col-lg-4')
            postElement.classList.add('col-xl-3')
            postElement.classList.add('col-xxl-2')

            let description = post.description
            let title  = post.title
            
            title = truncateString(title, 52)
            description = truncateString(description, 250)

            postElement.innerHTML = `
                <div class="card">
                            <div class=card-image>
                                <img src="${post.image}" class="card-img-top"
                                    alt="${title}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <div class="price">
                                <small class="catagory col-6">${post.category}</small>
                                <small class="amount col-6">Price: $${post.price}</small>
                                </div>
                                <p class="card-text">${description}</p>
                                <a href="#" class="btn btn-warning">Add to cart</a>
                            </div>
                        </div>
            `;
            productCardContainers.appendChild(postElement);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function searchProduct() {
    try {
        let searchString = document.getElementById('searchinput').value;
        searchString = searchString.trim()
        if(searchString == "")
            return
        searchString = searchString.toLowerCase()
        searchString = removeSpecialCharacters(searchString)
        searchString = searchString
        const response = await fetch('https://fakestoreapi.com/products'); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data

        const productCardContainers = document.getElementById('productCardRow')
        productCardContainers.innerHTML=''
        data.forEach(post => {
            let descriptionSmall = post.description.toLowerCase()
            let titleSmall  = post.title.toLowerCase()
            let catagorySmall = post.title.toLowerCase()

            descriptionSmall = removeSpecialCharacters(descriptionSmall)
            titleSmall = removeSpecialCharacters(titleSmall)
            catagorySmall = removeSpecialCharacters(catagorySmall)

            let addtoList = false
            
            if(stringCheck(descriptionSmall,searchString)|| stringCheck(titleSmall,searchString) || stringCheck(catagorySmall,searchString))
                addtoList = true
            console.log(addtoList)
            if(addtoList){
                const postElement = document.createElement('div');
                postElement.classList.add('cardcovering')
                postElement.classList.add('col-sm-12')
                postElement.classList.add('col-md-6')
                postElement.classList.add('col-lg-4')
                postElement.classList.add('col-xl-3')
                postElement.classList.add('col-xxl-2')

                let description = post.description
                let title  = post.title

                title = truncateString(title, 52)
                description = truncateString(description, 250)

                postElement.innerHTML = `
                    <div class="card">
                                <div class=card-image>
                                    <img src="${post.image}" class="card-img-top"
                                        alt="${title}">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <div class="price">
                                    <small class="catagory col-6">${post.category}</small>
                                    <small class="amount col-6">Price: $${post.price}</small>
                                    </div>
                                    <p class="card-text">${description}</p>
                                    <a href="#" class="btn btn-warning">Add to cart</a>
                                </div>
                            </div>
                `;
                productCardContainers.appendChild(postElement);
            }
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function fetchAllCatagories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories'); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data

        const dropdownContainer = document.getElementById('catagoryDropdown')

        data.forEach(post => {
            const postElement = document.createElement('button');
            postElement.classList.add('dropdown-item')
            postElement.addEventListener('click', function() {
                fetchItemCatagoryWise(post);
            });
            postElement.innerHTML = `
                ${post}
            `;
            dropdownContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function fetchItemCatagoryWise(catagory){
    try {
        console.log(`https://fakestoreapi.com/products/category/${catagory}`)
        const response = await fetch(`https://fakestoreapi.com/products/category/${catagory}`); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data

        const productCardContainers = document.getElementById('productCardRow')
        productCardContainers.innerHTML=''
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('cardcovering')
            postElement.classList.add('col-sm-12')
            postElement.classList.add('col-md-6')
            postElement.classList.add('col-lg-4')
            postElement.classList.add('col-xl-3')
            postElement.classList.add('col-xxl-2')

            let description = post.description
            let title  = post.title
            
            title = truncateString(title, 52)
            description = truncateString(description, 250)

            postElement.innerHTML = `
                <div class="card">
                            <div class=card-image>
                                <img src="${post.image}" class="card-img-top"
                                    alt="${title}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <div class="price">
                                <small class="catagory col-6">${post.category}</small>
                                <small class="amount col-6">Price: $${post.price}</small>
                                </div>
                                <p class="card-text">${description}</p>
                                <a href="#" class="btn btn-warning">Add to cart</a>
                            </div>
                        </div>
            `;
            productCardContainers.appendChild(postElement);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

//;imit string length
function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}

function removeSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');  // Remove anything except letters, numbers, and spaces
}

function stringCheck(string,subString){
    let stringWords = string.split(" ")
    let subStringWords = subString.split(" ")
    return subStringWords.every(element => stringWords.includes(element));
}


// Call the async function
fetchAllProducts();
fetchAllCatagories()