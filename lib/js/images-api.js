const BASE_URL = 'https://pixabay.com/api';
const ORIENTATION = 'horizontal';
const IMAGE_TYPE = 'photo&orientation';
const PAGE_ITEMS = 12;
const KEY = '18688009-3aa6093aef034eb83f835d04d';
export default class ImagesAPI {
  constructor() {
    this.nameQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/?image_type=${IMAGE_TYPE}=${ORIENTATION}&q=${this.nameQuery}&page=${this.page}&per_page=${PAGE_ITEMS}&key=${KEY}`;
    return fetch(url).then(res => res.json()).then(data => {
      return data.hits;
    });
  }

  get name() {
    return this.nameQuery;
  }

  set name(newName) {
    this.nameQuery = newName;
  }

  incrementPage() {
    this.page += 1;
  }

  setDefaultPage() {
    this.page = 1;
  }

}