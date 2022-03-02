// Document Define
const searchBtn = document.getElementById("searchBtn");
let inputBox = document.getElementById("inputBox");
const phoneContainer = document.getElementById("phoneContainer")

// Search Function
const searchPhone = () => {
    // Fetching API
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputBox.value}`)
        .then(res => res.json())
        .then(phones => phoneData(phones.data, phones.status));
}

const phoneData = (phones, status) => {

    //Remove previous data
    phoneContainer.textContent = "";

    // if user input is not found in the api
    if (status == false) {
        const notFound = document.createElement("h1");
        notFound.innerText = "No Phone Found";
        notFound.classList.add("text-center", "w-100");
        phoneContainer.appendChild(notFound);
    }

    //Loop through every single object 
    phones.forEach(phone => {

        // Creating a new card
        const card = document.createElement("div");

        // Adding styles to the card
        card.classList.add("word-break", "border", "p-4");

        // Card info
        card.innerHTML = `
                        <img src="${phone.image}" class="card-img-top d-block m-auto my-3" alt="Product Img" style="width: 60%;">
                        <h5 class="card-title fw-bold text-capitalize text-sm-center text-lg-start">${phone.phone_name}</h5>
                        <p class="text-capitalize text-sm-center text-lg-start">Brand: <span class="text-success">${phone.brand}</span></p>
                        <a href="#" class="btn btn-dark w-100">Details</a>
                    `;

        // Containing the div
        phoneContainer.appendChild(card);
        console.log(phone);

    });

}
// Showing the phones when the search button has been clicked
searchBtn.onclick = searchPhone;