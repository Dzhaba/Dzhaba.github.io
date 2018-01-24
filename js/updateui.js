import getJSON from './parse.js';
import {generator, category, keywords} from './main.js';

let apiKey = 'c48ac15e851a4259b83bc767309360ed';
let country = 'us';
let pageSize = 20;
let endPoint = 'top-headlines';
let pageNumber = 1;
let link = 'https://newsapi.org/v2/';
let defaultLink = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=c48ac15e851a4259b83bc767309360ed';
function updateUi() {
  if (keywords) {
    endPoint = 'everything';
    link  += endPoint + '?q=' + keywords + '&apiKey='
        + apiKey + '';
  }
  if (category != 'all') {
    endPoint = 'top-headlines';
    link += endPoint + '?country=' + country + '&category=' + category
        + '&apiKey=' + apiKey + '';
  }
  if (!keywords && category == 'all') {
    getJSON(defaultLink, generator);
    link = 'https://newsapi.org/v2/';
  }
  else {
    getJSON(link, generator);
    link = 'https://newsapi.org/v2/';
  }
}
export {keywords, category, updateUi}