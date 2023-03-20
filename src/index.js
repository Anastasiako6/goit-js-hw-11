import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const KEY = '34508381-5f1bfab6abde36f0f37ce7014';
const HITS_PER_PAGE = 40;
let page = 1;
let items = [];
let query = '';

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
};

refs.loadMore.style.display = 'none'; 

const showBtnLoadMore = () => {
    refs.loadMore.classList.display = 'none';
};

const render = () => {
    const galleryMarkup = items.map(({ likes, views, comments, downloads, tags, webformatURL, largeImageURL }) => `
    <a href="${largeImageURL}">
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
    <b>Likes</b>
    ${likes}
    </p>
    <p class="info-item">
    <b>Views</b>
    ${views}
    </p>
    <p class="info-item">
    <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
    <b>Downloads</b>
    ${downloads}
    </p>
    </div>
    </div>
    </a>
    `);

    if (page === 1) {
        refs.gallery.innerHTML = '';
    };

    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    simpleLightbox.refresh();
    showBtnLoadMore();

};

let  simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
    captionDelay: 250,
});


const queryHandler = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.searchQuery;

    if (query === value || !value) {
        return;
    };

    query = value.trim();

    if (query === '') {
        return;
    };

    page = 1;
    goFetch(query);
};

const goFetch = async (query) => {
    const response = await fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    const data = await response.json();
    if (data.hits.length === 0 ||  data.hits.length === '') {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    } else if (data.hits.length < 40  & data.hits.length > 0) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    } else {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }

    
    items = data.hits;
    render();
};

const loadMoreHandler = () => {
    page += 1;
    goFetch(query);
};

refs.form.addEventListener('submit', queryHandler);
refs.loadMore.addEventListener('click', loadMoreHandler);