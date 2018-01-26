import getJSON from './parse.js';
import {generator, category, keywords} from './main.js';

const $PAGINATION = $('.pagination');
let resetInfo = true;
let apiKey = 'c48ac15e851a4259b83bc767309360ed';
let page = 1;
let country = 'us';
let endPoint = 'top-headlines';
let link = 'https://newsapi.org/v2/';
let search = false;
let defaultLink = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=c48ac15e851a4259b83bc767309360ed';
let currentLink = '';
function extractPageNumber(string) {
  let stringArray = string.split('&');
  let pageNumber = stringArray[1].replace('page=','');
  return pageNumber;
}
function updateUi() {
  if (keywords) {
    search = true;
    endPoint = 'everything';
    link = 'https://newsapi.org/v2/';
    link  += `${endPoint}?q=${keywords}&page=${page}&apiKey=${apiKey}`;
  }

  if (category !== 'all' && !keywords) {
    search = false;
    endPoint = 'top-headlines';
    link = 'https://newsapi.org/v2/';
    link += `${endPoint}?country=${country}&category=${category}&apiKey=${apiKey}`;
  }

  if (!keywords && category === 'all') {
    search = false;
    resetInfo = true;
    getJSON(defaultLink, generator);
    link = 'https://newsapi.org/v2/';
  }

  else {
    resetInfo = true;
    getJSON(link, generator);
    currentLink = link;
  }
}
$PAGINATION.on('click', function(e) {
  e.preventDefault;
  resetInfo = false;
  let currentPageNumber = extractPageNumber(currentLink);
  link = currentLink.replace(`page=${currentPageNumber}`, `page=${++currentPageNumber}`);
  getJSON(link, generator);
  currentLink = link;
})
export {search, resetInfo, keywords, category, updateUi}
