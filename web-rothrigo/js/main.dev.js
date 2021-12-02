"use strict";

jQuery.curCSS = function (element, prop, val) {
  return jQuery(element).css(prop, val);
};

$(document).ready(function () {
  $('.element-box a, .element-box img').hover(function () {
    var color = $(this).parent().attr('color-hover');
    $("body").animate({
      "background-color": color
    }, 100);
    $(this).parent().find('.element-tag').fadeIn(200);
  }, function () {
    $("body").animate({
      "background-color": "#FFF0C2"
    }, 100);
    $(this).parent().find('.element-tag').fadeOut(200);
  });
});

function shuffle(array) {
  var currentIndex = array.length,
      randomIndex; // While there remain elements to shuffle...

  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.

    var _ref = [array[randomIndex], array[currentIndex]];
    array[currentIndex] = _ref[0];
    array[randomIndex] = _ref[1];
  }

  return array;
}