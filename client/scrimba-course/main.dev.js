"use strict";

var myLeads = [];
var inputBtn, inputEl, ulEl, deleteBtn;
$(document).ready(function () {
  inputBtn = $('#input-btn');
  inputEl = $('#input-el');
  ulEl = $('#ul-el');
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