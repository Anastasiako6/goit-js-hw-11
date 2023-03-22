
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImage from './fetchImages';

const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('input[type="text"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');


let page = 1;

loadMore.style.display = 'none';

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', (e) => {
e.preventDefault();
  cleanGallery();
  let inputValue = searchInput.value.trim();
  if (inputValue === '')
  {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.',
    );
    loadMore.style.display = 'flex';
    return;
  }
  fetchImage(inputValue, page)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
          loadMore.style.display = 'none';
      } else {
        renderGallery(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMore.style.display = 'flex';
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
});

loadMore.addEventListener('click', onClickLoadMoreBtn);

function onClickLoadMoreBtn() {
  page += 1;
  let inputValue = searchInput.value.trim();
  fetchImage(inputValue, page).then(foundDate => {
    renderGallery(foundDate.hits);

    if (foundDate.hits.length < 40) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      loadMore.style.display = 'none';
    }
  });
}


function cleanGallery() {
  gallery.innerHTML = '';
  page = 1;
}

function renderGallery(images) {
  const markup = images
    .map(photo =>
        `<a class="photo-link" href="${photo.largeImageURL}">
            <div class="photo-card">
            <div class="photo">
            <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"/>
            </div>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${photo.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${photo.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${photo.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${photo.downloads}
                        </p>
                    </div>
            </div>
        </a>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  simpleLightBox.refresh();
}
