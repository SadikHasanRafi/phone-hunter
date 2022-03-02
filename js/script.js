const searchBtn = document.getElementById("searchBtn");
let inputBox = document.getElementById("inputBox");
const phoneContainer = document.getElementById("phoneContainer")

const searchPhone = () => {
    console.log(inputBox.value);
    let url = `https://openapi.programming-hero.com/api/phones?search=${inputBox.value}`;

    fetch(url)
        .then(res => res.json())
        .then(phones => phoneData(phones.data));
}

const phoneData = (phones) => {

    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("word-break", "border", "p-4");
        div.innerHTML = `
        <img src="${phone.image}" class="card-img-top d-block m-auto my-3" alt="Product Img" style="width: 60%;">
        <h5 class="card-title fw-bold text-capitalize text-sm-center text-lg-start">${phone.phone_name}</h5>
        <p class="text-capitalize text-sm-center text-lg-start">Brand: <span class="text-success">${phone.brand}</span></p>
        <a href="#" class="btn btn-dark w-100">Details</a>
        `
        phoneContainer.appendChild(div);

        console.log(phone);
    });
}

searchBtn.onclick = searchPhone;