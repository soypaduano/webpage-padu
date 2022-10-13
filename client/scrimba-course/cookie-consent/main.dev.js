"use strict";

var delay = 1500;
var modal = document.getElementById('modal');
var modalClose = document.getElementById('modal-close-btn');
var cookieForm = document.getElementById('cookie-form');
var modalText = document.getElementById('modal-text');
var declineBtn = document.getElementById('declined-btn');
var containerButtons = document.getElementById('modal-choice-btns');
setTimeout(function () {
  modal.style.display = 'inline';
}, delay);
declineBtn.addEventListener('mouseover', function (event) {
  containerButtons.classList.toggle('reverse');
});
modalClose.addEventListener("click", function () {
  modal.style.display = 'none';
});
cookieForm.addEventListener('submit', function (e) {
  e.preventDefault();
  modalText.innerHTML = "<div class=\"modal-inner-loading\">\n                            <img src=\"images/loading.svg\" class=\"loading\">\n                            <p id=\"uploadText\">\n                                Uploading your data to the dark web...\n                            </p>\n                        </div>";
  var loginFormData = new FormData(cookieForm);
  var userName = loginFormData.get('name');
  setTimeout(function () {
    document.getElementById('uploadText').textContent = 'Making the sale...';
    document.getElementById('modal-inner').innerHTML = "<h2>Thanks you <span class=\"modal-display-name\"> ".concat(userName, " </span> ! </h2>\n        <p>We just sold the rights to your eternal soul.</p>\n        <div class=\"idiot-gif\">\n            <img src=\"images/pirate.gif\">\n        </div>\n        ");
    modalClose.disabled = false;
  }, 1500);
});