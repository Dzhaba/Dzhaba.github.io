import {Table, TableVertical} from './generator.js';
import {capitalizeFormat} from './formatter.js';
import {updateUi} from './updateui.js';

//--------------------------------VARIABLES---------------------------------//
const $HAMBURGER = $('.header__hamburger');
const $OVERLAY = $('#sidenav-overlay');
const $MMENU = $('.header__sidebar-nav');
const $SEARCH_FORM_INPUT = $('#search');
const $SEARCH_FORM_WRAP = $('.search-form__wrap');
const $SEARCH_BUTTON = $('.search-form__button_search');
const $CLOSE_BUTTON = $('.search-form__button_close');
const $SEARCH_FORM_LABEL = $('.search-form__label');
const $MOBILE_SEARCH_FORM = $('#search-mobile');
const $MOBILE_SEARCH_WRAP = $('.mobile-search-form__wrap');
const $MOBILE_SEARCH_LABEL = $('.mobile-search-form__label');
const $MOBILE_SEARCH_INPUT = $('.mobile-search-form__input');
const $DROPDOWN_ARROW_ICON = $('.mobile-arrow');
const $CATEGORIES_ITEM = $('.primary-menu__item_categories');
const $CATEGORIES_LINK = $('.primary-menu__link_categories');
const $CATEGORIES_DROPDOWN_LIST = $('.categories-content__list');
const $CATEGORIES_DROPDOWN_TOGGLE = $('.categories-content__toggle');
const $MOBILE_CATEGORIES_ITEM = $('.mobile-menu__item_categories');
const $MOBILE_CATEGORIES_LINK = $('.mobile-menu__link_categories');
const $MOBILE_CATEGORIES_DROPDOWN_LIST = $('.categories-mobile__list');
const $MOBILE_CATEGORIES_DROPDOWN_TOGGLE = $('.categories-mobile__toggle');
const $COLORS_ITEM = $('.primary-menu__item_colors');
const $COLORS_DROPDOWN_LIST = $('.colors-content__list');
const $COLORS_DROPDOWN_TOGGLE = $('.colors-content__toggle');
const $COLOR_PREVIEW = $('.color-preview');
const $CARDS = $('.primary-menu__item_cards');
const $CARDS_VERTICAL = $('.primary-menu__item_cards-vertical');
const $REFRESH = $('#refresh');
let isSearchTriggered = false;
let colorableBackgroundParts = [
  '.header__primary-nav',
  '.footer',
  '.mobile-menu__item_search',
  '.to-top'];
let colorableTextParts = [
  '.categories-content__link'];
let currentColor = 'indigo';
let colors = {
  'red': '#c62828',
  'pink': '#ad1457',
  'purple': '#6a1b9a',
  'indigo': '#283593',
  'blue': '#1565c0',
  'cyan': '#00838f',
  'teal': '#00695c',
  'green': '#2e7d32',
  'lime': '#9e9d24',
  'yellow': '#f9a825',
  'orange': '#ef6c00',
  'amber': '#ff8f00',
  'deep-orange': '#d84315',
  'brown': '#4e342e',
  'grey': '#424242',
  'blue-grey': '#37474f',
};
let generator = new Table();
let cardsType = 'horizontal';
let category = 'all';
let keywords = '';

$(document).ready(function() {
  updateUi();

//------------------------------REFRESH PAGE------------------------------//
  $REFRESH.on('click', function(e) {
    e.preventDefault();
    updateUi();
  })

//--------------------------------HAMBURGER---------------------------------//
  $HAMBURGER.on('click', function() {
    $MMENU.css('transform', 'translateX(0)');
    $OVERLAY.css('display', 'block');
    $OVERLAY.on('click', function() {
      $MMENU.css('transform', 'translateX(-300px)');
      $OVERLAY.css('display', 'none');
    });
  });

//-----------------------------------LABEL-HIDE------------------------------------//
  $SEARCH_FORM_INPUT.on('input', function() {

    if ($SEARCH_FORM_INPUT.val() !== '') {
      $SEARCH_FORM_LABEL.hide();
    }
    else {
      $SEARCH_FORM_LABEL.show();
    }
  });

  $MOBILE_SEARCH_INPUT.on('input', function() {
    if ($MOBILE_SEARCH_INPUT.val() !== '') {
      $MOBILE_SEARCH_LABEL.hide();
    }
    else {
      $MOBILE_SEARCH_LABEL.show();
    }
  });
//-----------------------------------SEARCH-FOCUS------------------------------------//
  $SEARCH_FORM_INPUT.on('focus', function() {
    $SEARCH_FORM_WRAP.addClass('focused');
  });
  $MOBILE_SEARCH_INPUT.on('focus', function() {
    $MOBILE_SEARCH_WRAP.addClass('focused');
  });

  $SEARCH_BUTTON.on('click', function() {
    $SEARCH_FORM_WRAP.addClass('focused');
    $SEARCH_FORM_INPUT.focus();
  });
  $CLOSE_BUTTON.on('click', function() {
    $SEARCH_FORM_WRAP.removeClass('focused');
  });
//--------------------------------SEARCH-DESKTOP---------------------------------//
  $SEARCH_FORM_INPUT.on('input', function() {
    if ($SEARCH_FORM_INPUT.val() === '' && isSearchTriggered) {
      updateUi();
      isSearchTriggered = false;
      keywords = '';
    }
    else if ($SEARCH_FORM_INPUT.val().length >= 3) {
      isSearchTriggered = true;
      keywords = $SEARCH_FORM_INPUT.val();
      updateUi();
      keywords = '';
    }
  });
  //--------------------------------SEARCH-MOBILE---------------------------------//
  $MOBILE_SEARCH_FORM.on('submit', function(e) {
    e.preventDefault();
    if ($MOBILE_SEARCH_INPUT.val() == '') {
      return;
    }
    else {
      keywords = $MOBILE_SEARCH_INPUT.val();
      updateUi();
      keywords = '';
      $MMENU.css('transform', 'translateX(-300px)');
      $OVERLAY.css('display', 'none');
    }
  });

  //------------------------MOBILE-CATEGORIES-ARROW-CHANGE-------------------------//
  $MOBILE_CATEGORIES_ITEM.on('click', function() {
    if ($MOBILE_CATEGORIES_DROPDOWN_LIST.hasClass('active')) {
      $DROPDOWN_ARROW_ICON.html('arrow_drop_down');
    }
    else {
      $DROPDOWN_ARROW_ICON.html('arrow_drop_up');
    }
    $MOBILE_CATEGORIES_DROPDOWN_LIST.toggleClass('active');
  });
  //------------------------CATEGORIES-COLOR-DROPDOWN-TOGGLE-------------------------//
  $(document).click(function() {
    $CATEGORIES_DROPDOWN_LIST.removeClass('active');
    $COLORS_DROPDOWN_LIST.removeClass('active');
  });
  $CATEGORIES_ITEM.on('click', function(e) {
    e.stopPropagation();
    $CATEGORIES_DROPDOWN_LIST.toggleClass('active');
  });
  //------------------------------CATEGORIES-DESKTOP---------------------------//
  $CATEGORIES_DROPDOWN_TOGGLE.on('click', function() {
        $SEARCH_FORM_WRAP.removeClass('focused');
        $SEARCH_FORM_INPUT.val('');
        if (category != $(this).html()) {
          category = $(this).html();
          $CATEGORIES_LINK.
          html(capitalizeFormat($(this).html())
              + '<i class="material-icons right">arrow_drop_down</i>');
          $('.mobile-menu__link_categories').
          html(capitalizeFormat($(this).html())
              + '<i class="material-icons right">arrow_drop_down</i>');
          updateUi();
          if ($(this).html() == 'all') {
            category = 'all';
            updateUi();
          }
        }
      },
  );
  //------------------------------CATEGORIES-MOBILE------------------------------//
  $MOBILE_CATEGORIES_DROPDOWN_TOGGLE.on('click', function() {
        $MMENU.css('transform', 'translateX(-300px)');
        $OVERLAY.css('display', 'none');
        $MOBILE_SEARCH_INPUT.val('');
        if (category != $(this).html()) {
          category = $(this).html();
          $CATEGORIES_LINK.
          html(capitalizeFormat($(this).html())
              + '<i class="material-icons right">arrow_drop_down</i>');
          $MOBILE_CATEGORIES_LINK.
          html(capitalizeFormat($(this).html())
              + '<i class="material-icons right">arrow_drop_down</i>');
          updateUi();
          if ($(this).html() == 'all') {
            category = 'all';
            updateUi();
          }
        }
      },
  );
  //------------------------COLORSCHEME CHANGER-------------------------//
  $COLORS_ITEM.on('click', function(e) {
    e.stopPropagation();
    $COLORS_DROPDOWN_LIST.toggleClass('active');
  });
  $COLORS_DROPDOWN_TOGGLE.on('click', function() {
    let mainColor = $(this).attr('data-color');
    if (mainColor == currentColor) {
      return;
    }
    $COLOR_PREVIEW.
    css('background-color', '' + colors['' + mainColor + ''] + '');
    for (let i = 0; i < colorableBackgroundParts.length; i++) {
      $('' + colorableBackgroundParts[i] + '').addClass('' + mainColor + '');
      $('' + colorableBackgroundParts[i] + '').
      removeClass('' + currentColor + '');
    }
    for (let i = 0; i < colorableTextParts.length; i++) {
      $('' + colorableTextParts[i] + '').
      css('color', '' + colors['' + mainColor + ''] + '');
    }
    currentColor = mainColor;
  });
  //------------------------CARDS CHANGER-------------------------//
  $CARDS_VERTICAL.on('click', function() {
    $(this).hide();
    $CARDS.fadeIn();
    generator = new Table();
    cardsType = 'horizontal';
    updateUi();
  });
  $CARDS.on('click', function() {
    $(this).hide();
    $CARDS_VERTICAL.fadeIn();
    generator = new TableVertical();
    cardsType = 'vertical';
    updateUi();
  });
});

export {generator, category, keywords, cardsType};
