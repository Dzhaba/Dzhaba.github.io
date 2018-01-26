import {search} from './updateui.js';

function getJSON(url, success) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (this.status === 200 && this.readyState === 4) {
      let jsonData = JSON.parse(xhr.responseText);
      /** @namespace jsonData.articles */
      let articleList = jsonData.articles;
      if (articleList.length == 0) {
        if ($('.nothing-found').length == 0) {
          $('.pagination').hide();
          $('.main').
          append('<h1 class="nothing-found"> Ничего не найдено!</h1>');
        }
      }
      else {
        $('.nothing-found').remove();
      }
      success.generateData(articleList);
    }
  };
  xhr.onloadstart = function() {
    $('.preloader-wrap').fadeIn();
    $('.pagination').hide();
    $('.column').fadeOut();
  };
  xhr.onloadend = function() {
    $('.preloader-wrap').fadeOut();
    $('.column').fadeIn();
    if (search) {
      $('.pagination').show();
    }
    else {
      $('.pagination').hide();
    }
  };
  xhr.onerror = function() {
    if (!$('connection-problem').length) {
      $('.main').
      append(
          '<div class="connection-problem"><h1>Connection Problem</h1><i style="font-size: 50px" class="material-icons">signal_cellular_connected_no_internet_4_bar</i><h2>Try to <button id="refresh" class="connection-refresh">refresh</button> page...</h2></div>');
    }
    ;
  };
  xhr.send();
}

export default getJSON;
