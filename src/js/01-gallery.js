import '../css/01-gallery.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);



const galleryContainer = document.querySelector('.gallery');

const cardsMarkup = createGalleryItemCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

const lightbox = new SimpleLightbox('.gallery li a', {
    captionsData: "alt",
    captionDelay: 250
});

function createGalleryItemCardMarkup(galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                alt="${description}"
            />
            </a>
        </li>
        `;
    })
    .join('');
};
