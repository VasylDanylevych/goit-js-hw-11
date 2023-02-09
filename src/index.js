import './css/styles.css';
import ImgApi from './api';
import Notiflix from 'notiflix';

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");
const input = document.querySelector("input");

const imgApi = new ImgApi();

form.addEventListener("submit", onSearch);
loadMore.addEventListener("click", onLoadMore);

window.onload = () => input.focus();

function onSearch(e) {
    e.preventDefault();

    imgApi.query = e.currentTarget.elements.searchQuery.value;

    imgApi.resetPage()
    imgApi.getImg().then((images) => {
        console.log(images)
        const imgMarkup = images.hits.reduce((markup, image) => createMarkup(image) + markup, "");
        clearGallery()
        appendMarkup(imgMarkup)
    })
};

function onLoadMore() {
    imgApi.getImg().then((images) => {
        console.log(images)
        const imgMarkup = images.hits.reduce((markup, image) => createMarkup(image) + markup, "");
        appendMarkup(imgMarkup)
    })
    imgApi.incrementPage()
};


function appendMarkup(markup) {
    gallery.insertAdjacentHTML("beforeend", markup)
};

function clearGallery() {
    gallery.innerHTML = "";
};

function createMarkup(image) {
    return `
    <div class='photo-card'>
        <a href="${image.largeImageURL}">
            <img src='${image.webformatURL}' alt='${image.tags}' loading='lazy' />
        </a>
        <div class='info'>
            <p class='info-item'>
                <b>Likes</b>${image.likes}
            </p>
            <p class='info-item'>
                <b>Views</b>${image.views}
            </p>
            <p class='info-item'>
                <b>Comments</b>${image.comments}
            </p>
            <p class='info-item'>
                <b>Downloads</b>${image.downloads}
            </p>
        </div>
    </div>`
  };

