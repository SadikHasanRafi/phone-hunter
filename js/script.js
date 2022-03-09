// Document Define
const searchBtn = document.getElementById("searchBtn");
let inputBox = document.getElementById("inputBox");
const phoneContainer = document.getElementById("phoneContainer");

// Search Function
const searchPhone = () => {
    // Fetching API
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputBox.value}`)
        .then(res => res.json())
        .then(phones => phoneData(phones.data, phones.status));

    inputBox.value = "";
}

const phoneData = (phones, status) => {

    //Remove previous data
    phoneContainer.textContent = "";

    // if user input is not found in the api
    if (status == false) {
        const notFound = document.createElement("h1");
        notFound.innerText = "No Phone Found 😓";
        notFound.classList.add("text-center", "w-100", "font-monospace", "text-danger");
        phoneContainer.appendChild(notFound);
    }

    let counter = 0;

    //Loop through every single object 
    for (let phone of phones) {

        //Counting
        counter++;

        //Stop counter if phones length in 20
        if (counter <= 20) {
            // Creating a new card
            const card = document.createElement("div");

            // Adding styles to the card
            card.classList.add("word-break", "border", "p-4");

            // Card info
            card.innerHTML = `
                <img src="${phone.image}" class="card-img-top d-block m-auto my-3" alt="Product Img" style="width: 60%;">
                <h5 class="card-title fw-bold text-capitalize text-sm-center text-lg-start">${phone.phone_name}</h5>
                <p class="text-capitalize text-sm-center text-lg-start">Brand: <span class="text-success">${phone.brand}</span></p>
                <a href="#" class="btn btn-dark w-100" onclick="phoneDetail(${ "'" + phone.slug + "'"})">Details</a>
            `;

            // Containing the div
            phoneContainer.appendChild(card);


        } else {
            break;
        }

    }

}
//Details Data
const phoneDetail = details => {
    //Fetching API
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
        .then(res => res.json())
        .then(detailsData => showDetails(detailsData.data));

}

const detailsDiv = document.createElement("div");
const showDetails = data => {

    detailsDiv.classList.add("card", "col-12", "mb-3", "detailDiv");
    detailsDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
        <img src="${data.image}" class=" img-fluid d-block pt-5 m-auto rounded-start" alt="...">
        </div>
        <div class="col-md-8">
        <div class="card-body py-5">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text"><small class="text-muted">${data?.releaseDate || "No Release Date Found"}</small></p>
            <p class="card-text">Storage: ${data.mainFeatures.displaySize}</p>
            <p class="card-text">Chipset: ${data.mainFeatures.chipSet} </p>
            <p class="card-text">Memory: ${data.mainFeatures.memory}</p><hr>
            <p class="card-text">Sensors:<br> ${data.mainFeatures.sensors}</p><hr>
            <p class="card-text">Others:<br>
                Bluetooth: ${data.others?.Bluetooth || "N/A"}<br>
                GPS: ${data.others?.GPS || "N/A"}<br>
                NFC: ${data.others?.NFC || "N/A"}<br>
                Radio: ${data.others?.Radio || "N/A"}<br>
                USB: ${data.others?.USB || "N/A"}<br>
                WLAN: ${data.others?.WLAN || "N/A"}
            </p>
        </div>
        </div>
    </div>
    `

    phoneContainer.prepend(detailsDiv);
}

// Showing the phones when the search button has been clicked
searchBtn.onclick = searchPhone;
