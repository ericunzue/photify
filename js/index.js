'use strict'
document.addEventListener("DOMContentLoaded", () => {
    getImages('random');


    let btn = document.getElementById('search_btn');
    btn.addEventListener('click', () => {
        let query = document.getElementById('input').value;
        if (query.length === 0) {
            query = "random"
        }

        getImages(query);
    });
    // When the user press Enter
    document.getElementById('input').addEventListener('keydown', inputCharacters);





});

const accesKey = '9JB0vQIltHHsXy2u-ebCoO7ZPjXzVNIRvKid6rijiHE';
const endPoint = 'https://api.unsplash.com/search/photos/';
const image_gallery = document.querySelector(".image--container")
const image_container = document.querySelector(".main")




async function getImages(query) {

    try {
        let response = await fetch(endPoint + '?per_page=30' + '&order_by=popular' + '&query=' + query + '&client_id=' + accesKey);
        if (response.ok) {
            let jsonResponse = await response.json();
            let imagesList = await jsonResponse.results;
            // console.log(imagesList);
            createImageGallery(imagesList);
        } else {
            image_container.innerHTML = "<h1>Error - Failed URL!</h1>";

        }
    } catch (response) {
        image_container.innerHTML = "<h1>Connection error</h1>";

    }

}


const createImageGallery = images => {
    console.log(images);

    let output = ""

    images.forEach(({ urls, alt_description, links }) => {

        output += `<div class="image--selection">
                        <img src="${urls.regular}" alt="${alt_description}" class="image__item" /> 
                        <a class="download-btn" href="${links.download}" target="blank"><img src="./image/arrow-circle-down-solid.svg" alt="download Icon" class="image__icon" /></a>    
                    </div>`;
    });

    image_container.innerHTML = output;


}


function inputCharacters(event) {
    let query = document.getElementById('input').value;
    if (event.keyCode == 13) {
        if (query.length === 0) {
            query = "random"
        }
        getImages(query);

    }
}



function setDimensions() {
    let images = document.getElementsByClassName('image__item');
    let btn_container = document.getElementsByClassName('btn-container');
    console.log(btn_container);
    for (let index = 0; index < images.length; index++) {
        btn_container[index].style.height = images[index].clientHeight + "px";
        btn_container[index].style.width = images[index].clientWidth + "px";

    }

}