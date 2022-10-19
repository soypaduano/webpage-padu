"use strict";

var _catsData = require("./catsData.js");

var emotionRatios = $('#emotion-radios');
$(document).ready(function () {
  addListenerToRadioButtons();
  addListenerToButton();
});

function getEmotionsArrayNew(cats) {
  var catEmotions = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cat = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = cat.emotionTags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var emotion = _step2.value;

          if (!catEmotions.includes(emotion)) {
            catEmotions.push(emotion);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return catEmotions;
}

function renderEmotionsRadios(cats) {
  var emotionString = '';
  var emotionsArray = [];
  var emotions = getEmotionsArrayNew(cats);
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = emotions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var emotion = _step3.value;

      if (!emotionsArray.includes(emotion)) {
        emotionString = "\n            <div class=\"radio\">\n                <label for=\"".concat(emotion, "\">").concat(emotion, "</label>\n                <input\n                type=\"radio\"\n                id=\"").concat(emotion, "\"\n                value=\"").concat(emotion, "\"\n                name=\"emotions\"\n                >");
        $(emotionRatios).append(emotionString);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  console.log(emotions);
  console.log(emotionsArray);
}

function addListenerToRadioButtons() {
  emotionRatios[0].addEventListener('change', function (e) {
    $('.radio.highlight').removeClass('highlight');
    $('#' + e.target.id + '').addClass('selected').parent().addClass('highlight');
  });
}

function addListenerToButton() {
  $('#get-image-btn').click(function () {
    getMatchingCatsArray();
  });
}

renderEmotionsRadios(_catsData.catsData);

function getMatchingCatsArray() {
  if ($('input[type="radio"]:checked').val()) {
    console.log($('input[type="radio"]:checked').val());
    console.log($('#gifs-only-option').prop('checked'));
  }
}
/*
Challenge:
1. Take control of the gifs only option checkbox.
2. Set up a const in getMatchingCatsArray to store 
   a boolean which will be set to true if the 
   "gifs only" option is checked and false if it's
   not. (Think what a good name for this const would 
   be.)
3. Log it out to check it's working.
*/