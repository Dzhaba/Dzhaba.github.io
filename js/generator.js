import {dateFormat} from './formatter.js';

export class Generator {
  constructor() {
  }

  generateData(article) {
  }
}

export class Table extends Generator {
  constructor() {
    super();
  }

  generateData(article) {
    const cardClass = 'card animated fadeInUp';
    const columnClass = 'column col-sm-12 col-md-6 col-lg-4';
    const linkClass = 'card__link';
    const imgBlockClass = 'card__image-wrap';
    const cardContentClass = 'card__content';
    // const cardImageClass = 'card__image';
    const cardActionClass = 'card__action';
    const cardAuthorClass = 'card__author';
    const cardTitleClass = 'card__title';
    const cardDateClass = 'card__date';

    const cardSelector = '.card';
    const rowSelector = '.row';
    const columnSelector = '.column';

    $(columnSelector).remove();

    for (let i = 0; i < article.length; i++) {
      let info = {
        image: article[i].urlToImage,
        title: article[i].title,
        descr: article[i].description,
        link: article[i].url,
        author: article[i].author,
        time: article[i].publishedAt,
      };
      let securedImgLink = info.image.replace('http://','https://');
      let securedLink = info.link.replace('http://','https://');
      if (!info.image) {
        info.image = 'https://www.sunhome.ru/i/wallpapers/200/planeta-zemlya-kartinka.960x540.jpg';
      }
      if (!info.author || info.author.includes('http')) {
        info.author = 'Unknown Author';
      }
      if (!info.title || !info.descr) {
        continue;
      }
      $(rowSelector).last().append('<div class="' + columnClass + '"></div>');
      $(columnSelector).last().append('<div class="' + cardClass + '"></div>');
      $(cardSelector).last().append(
          '<div class="' +
          imgBlockClass +
          '" style="background: url(' + securedImgLink
          + ') center 0 no-repeat; background-size: cover;"><div class="img-wrapper"></div><span class="'
          + cardTitleClass + '">' + info.title + '</span></div>');
      $(cardSelector).
      last().
      append('<div class="' + cardContentClass + '"><p>' + info.descr
          + '</p><span class="' + cardAuthorClass + '">' + info.author
          + '</span><span class="' + cardDateClass + '">' + dateFormat(
              info.time) + '</span>'
          + '</div>');
      $(cardSelector).
      last().
      append('<div class="' + cardActionClass + '"><a href="' + securedLink
          + '" class="' + linkClass
          + '">Read more ...</a></div>');
    }
  }
}

export class TableVertical extends Generator {
  constructor() {
    super();
  }

  generateData(article) {
    const cardClass = 'card-vertical animated fadeInUp';
    const columnClass = 'column col-md-12';
    const linkClass = 'card__link-vertical';
    const imgBlockClass = 'card__image-wrap-vertical';
    const cardStackClass = 'card__stacked-vertical';
    const cardContentClass = 'card__content-vertical';
    const cardTitleClass = 'card__title-vertical';
    const cardActionClass = 'card__action card__action_vertical';
    const cardAuthorClass = 'card__author card__author_vertical';
    const cardDateClass = 'card__date card__date_vertical';

    const cardSelector = '.card-vertical';
    const rowSelector = '.row';
    const columnSelector = '.column';

    $(columnSelector).remove();
    for (let i = 0; i < article.length; i++) {
      let info = {
        image: article[i].urlToImage,
        title: article[i].title,
        descr: article[i].description,
        link: article[i].url,
        author: article[i].author,
        time: article[i].publishedAt,
      };
      let securedImgLink = info.image.replace("http://","https://");
      let securedLink = info.link.replace("http://","https://");
      if (!info.image) {
        info.image = 'https://www.sunhome.ru/i/wallpapers/200/planeta-zemlya-kartinka.960x540.jpg';
      }
      if (!info.author || info.author.includes('http')) {
        info.author = 'Unknown Author';
      }
      if (!info.title || !info.descr) {
        continue;
      }
      $(rowSelector).last().append('<div class="' + columnClass + '"></div>');
      $(columnSelector).last().append('<div class="' + cardClass + '"></div>');
      $(cardSelector).last().append(
          '<div class="' +
          imgBlockClass + '" style="background: url(' + securedImgLink
          + ') center 0 no-repeat; background-size: cover;"></div>',
      );
      $(cardSelector).last().append(
          '<div class="' + cardStackClass + '"><div class="' +
          cardContentClass +
          '"><span class="' +
          cardTitleClass +
          '">' +
          info.title +
          '</span><p>' +
          info.descr +
          '</p><span class="' +
          cardAuthorClass +
          '">' +
          info.author +
          '</span><span class="' +
          cardDateClass +
          '">' +
          dateFormat(info.time) +
          '</span></div><div class="' +
          cardActionClass +
          '"><a class="' +
          linkClass +
          '" href="' +
          securedLink +
          '">Read more...</a></div></div>',
      );
    }
  }
}