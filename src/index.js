import './css/styles.css';
import ImgApi from './api';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");
const input = document.querySelector("input");

const imgApi = new ImgApi();

form.addEventListener("submit", onSearch);
loadMore.addEventListener("click", onLoadMore);

window.onload = () => input.focus();

loadMore.classList.add("is-hidden");


function onSearch(e) {
    e.preventDefault();

    imgApi.query = e.currentTarget.elements.searchQuery.value.trim();
        
    if (imgApi.query === "") {
        Notiflix.Notify.failure("Please, fill in the field, so we know what you're looking for.")
        return
    };

    imgApi.resetPage()
    imgApi.getImg().then((images) => {
        console.log(images);
        if (images.hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return
        };

        if (images.totalHits <= 40) {
            loadMore.classList.add("is-hidden");
        } else {
             loadMore.classList.remove("is-hidden");
        };
        clearGallery();
        addImgMarukp(images);
        
        Notiflix.Notify.info(`Hooray! We found ${images.totalHits} images.`);
        new SimpleLightbox('.gallery a', { captionDelay: 250,})
        scroll();
    })
};

function onLoadMore() {

    imgApi.incrementPage()
    imgApi.getImg().then((images) => {
        console.log(images);

        if (images.hits.length === 0) {
            loadMore.classList.add("is-hidden");
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        };

        addImgMarukp(images);
        new SimpleLightbox('.gallery a', { captionDelay: 250,}).refresh();
    })
};

function scroll() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
};


function clearGallery() {
    gallery.innerHTML = "";
};

function addImgMarukp(images) {
    const imgMarkup = images.hits.reduce((markup, image) => createMarkup(image) + markup, "");
    appendMarkup(imgMarkup);
};

function appendMarkup(markup) {
    gallery.insertAdjacentHTML("beforeend", markup)
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

