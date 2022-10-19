"use strict";

var myLeads = [];
var oldLeads = [];
var inputBtn, inputEl, ulEl, deleteBtn, tabButton;
var tabs = [{
  url: 'https://www.linkedin.com/in/per-harald-borgen/'
}];
$(document).ready(function () {
  inputBtn = $('#input-btn');
  inputEl = $('#input-el');
  ulEl = $('#ul-el');
  tabButton = $('#tab-btn');
  myLeads = [];
  renderLeads();
  $('#input-btn').click(function () {
    myLeads = localStorage.getItem('myLeads');
    myLeads = JSON.parse(myLeads);
    if (!myLeads) myLeads = [];
    myLeads.push($(inputEl).val());
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    $(inputEl).val('');
    renderLeads();
  });
  $('#delete-btn').dblclick(function () {
    alert("Borrando");
    localStorage.clear('myLeads');
    renderLeads();
  });
  $(tabButton).click(function () {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      myLeads = localStorage.getItem('myLeads');
      myLeads = JSON.parse(myLeads);
      if (!myLeads) myLeads = [];
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads();
    });
  });
});

function renderLeads() {
  var listItems = "";
  myLeads = localStorage.getItem('myLeads');
  myLeads = JSON.parse(myLeads);

  if (myLeads) {
    for (var i = 0; i < myLeads.length; i++) {
      listItems += '<li> <a href=' + myLeads[i] + ' target="_blank" > ' + myLeads[i] + '</li>';
    }
  }

  $(ulEl).html(listItems);
}