var debounce = require('debounce');
const Handlebars = require("handlebars");
const { error, success, alert } = require('@pnotify/core');
import "@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import refs from './refs';
import imagesApi from './images-api';
import imageTemplate from '../templates/images.hbs'
import { onOpenModal } from './modal';



alert({
        title: 'Пожалуйста введите ключевое слово для поиска',
        delay: 1500
    })

const newImagesService = new imagesApi();
const onInputChange = function (evt) {
    success({
        title: 'Картинки по вашему запросу найдены!!!',
        delay: 1500
    })
    clearContainer();
    newImagesService.setDefaultPage();
    newImagesService.name = evt.target.value;    
    newImagesService.fetchArticles().then(renderingPage); 
    
}
document.addEventListener('input', debounce(onInputChange, 500));
refs.gallery.addEventListener('click', onOpenModal);

const renderingPage = function (data) { 
    refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(data));
}         
      
  
const clearContainer = function () {
    refs.gallery.innerHTML = '';
}

const loadNextPage = function () {  
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    newImagesService.incrementPage();
    newImagesService.fetchArticles().then(renderingPage);
    }       
}

window.addEventListener('scroll', loadNextPage)


