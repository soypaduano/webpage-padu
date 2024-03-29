"use strict";

var test = false;
var dotsAnim, element, $copy;
var filters = [];

if (typeof window.orientation === 'undefined') {
  $('.one-day-event').addClass('desktop');
}

var $oneDayEvent;

if (!test) {
  $oneDayEvent = $('.one-day-event').remove();
  $($oneDayEvent).hide();
}

function readEventData(data) {
  //Evento de un día o evento de letios días?
  var events = data['@graph'];
  events = orderByDate(events);
  var uniqueEvents = removeRepeatedEvents(events);
  uniqueEvents.forEach(function (element_) {
    $copy = $oneDayEvent.clone();
    element = element_;
    if (!addDayHour(element)) return; //Esto devuelve un valor porque a veces, devuelve eventos que han sido ayer.

    var audience = addAudience(element);
    addDistrict(element);
    addTitleDescription(element);
    addEventLocation(element);
    addPrice(element);
    addLink(element);
    appendEventToParentDate($copy, element);
  });
  $('.loading').hide();
  clearInterval(dotsAnim);
  addListenerFilters();
}

function appendEventToParentDate($copy, element) {
  var date = element.dateEnd;
  var $dateSeparator = $('.date-separator[datestart=' + date + ']');

  if (!$dateSeparator.length) {
    $dateSeparator = $('<div class="date-separator" datestart=' + date + '> <p class="text-date">' + date.replaceAll('-', '.') + '</p> </div>');
    $('#events-list').append($dateSeparator);
  }

  $($dateSeparator).append($copy);
  $($copy).show();
}

function addDayHour(element) {
  //Obtenemos la fecha de inicio (todos los eventos la tienen)
  var dateStart = element['dtstart'];
  if (!dateStart) dateStart = 'No hay fecha de inicio';
  var dayStart = transformDateToString(dateStart.split(' ')[0]);
  element.date = dayStart; //Le añadimos la fecha al elemento

  $($copy).attr('day-start', dateStart.split(' ')[0]); //Vemos si tiene recurrencia

  var recurrence = element['recurrence'];
  var dateEnd;

  if (recurrence) {
    dateEnd = element['dtend'];
    if (!dateEnd) dateEnd = 'No hay fecha de fin';else dateEnd = transformDateToString(dateEnd.split(' ')[0]);
    $($copy).attr('dtend', "1");
    $($copy).find('.event-day-start').text('De ' + dayStart.toLocaleLowerCase() + ' a ' + dateEnd.toLocaleLowerCase());
  } else {
    //El evento no tiene recurrencia, por tanto, el día que termina es el día que empieza. 
    $($copy).find('.event-day-start').text('' + dayStart);
    dateEnd = dayStart;
  }

  element.dateEnd = dateEnd;
  if (isYesterday(dateStart) || isYesterday(dateEnd)) return false; //Tanto como si el evento empezaba ayer o terminaba ayer, quiere decir que está terminado. 
  //Le añadimos la hora de inicio 

  var time = element['time'];
  if (!time) time = 'Sin hora';
  $($copy).find('.event-hour').text('' + time);
  $($copy).dateStart = dayStart;
  return true;
}

function addAudience(element) {
  var audience = element['audience'];

  if (audience && (audience === 'Niños' || audience === 'Niños,Familias' || audience === 'Jovenes,Niños' || audience === 'Familias' || audience === 'Jovenes' || audience === 'Familias,Mayores')) {
    $($copy).attr('audience_kids', 0);
    $($copy).find('.event-audience').text('Para niños');
  } else if (audience && (audience === 'Mujeres' || audience === 'Mujeres,Familias' || audience === 'Mujeres,Familias')) {
    $($copy).attr('audience_woman', 0);
    $($copy).find('.event-audience').text('Feminismo');
  } else {
    $($copy).attr('audience_kids', 1);
    $($copy).attr('audience_woman', 1);
    $($copy).find('.event-audience').remove();
  }

  return audience;
}

function addDistrict(element) {
  var district = 'no-district';
  var postalcode = 'no-postal-code';

  if (element['address']) {
    district = getDistrict(element['address']['district']['@id']);

    if (element['address'['area']] && element['address']['area']['postal-code']) {
      postalcode = element['address']['area']['postal-code'];
      $($copy).find('.event-district').text(district + ', ' + postalcode);
    }

    $($copy).find('.event-district').text(district.replace(/([A-Z])/g, ' $1').trim().replace('- ', '-'));
  }

  district = district.toUpperCase();
  $($copy).attr('event-district', district);
}

function addTitleDescription(element) {
  $($copy).find('.event-title').text(element['title']);
  ;
  var description = element['description'];

  if (description === '') {
    $($copy).find('.event-description').html('<p>Para ver más información, <a id="link-to-event"> pincha aquí.</a></p>');
    $($copy).find('.event-more-info').find('#link-to-event').remove();
  } else {
    $($copy).find('.event-description').text(description);
  }

  $($copy).attr('id', element['id']);
}

function addEventLocation(element) {
  $($copy).find('.event-location').removeClass('none');
  var eventLocation = element['event-location'];

  if (!eventLocation) {
    eventLocation = 'Sin ubicación'; //no location

    $($copy).find('.event-location').addClass('none');
  } else {
    $($copy).find('.event-location').click(function () {
      window.open("http://maps.google.com/?q=" + eventLocation);
    });
  }

  $($copy).find('.event-location').text(eventLocation);
}

function addPrice(element) {
  var free = element['free'];

  if (free) {
    price = 'Gratis';
  } else {
    price = element['price']; //Caso: no es free, pero no tiene precio

    if (!price) price = 'Precio: Consultar en la web';else price = '' + price;
  }

  $($copy).find('.event-price').text(price);
  $($copy).attr('free', free);
}

function addLink(element) {
  var link = element['link'];
  $($copy).find('.event-title').click(function () {
    window.open(link);
  });
  $($copy).find('#link-to-event').click(function () {
    window.open(link);
  });
  $($copy).find('.share-whatsapp').click(function () {
    window.open('whatsapp://send?text= He encontrado este evento. Fichalo. ' + encodeURIComponent(link));
  });
}

function removeRepeatedEvents(events) {
  var uniqueArray = events.filter(function (v, i, a) {
    return a.findIndex(function (t) {
      return t.title === v.title;
    }) === i;
  });
  return uniqueArray;
}

function getDistrict(district) {
  var parts = district.split('/');
  var lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash

  return lastSegment;
}

function transformDateToString(dateString) {
  var dt = new Date(dateString);

  if (isToday(dt)) {
    return 'Hoy';
  } else if (isTomorrow(dt)) {
    return 'Mañana';
  } else {
    return '' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear();
  }
}

$(document).ready(function () {
  loadingAnim();
  addListenerCreator();
  if (!test) doRequestActividadesCulturales();
});

function doRequestActividadesCulturales() {
  var currentURL = window.location.href;
  var urlEvents = currentURL + '/request';
  doEventsRequest(urlEvents);
}

function doEventsRequest(url) {
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    complete: function complete(req, data, error) {},
    success: function success(data) {
      readEventData(data);
    },
    error: function error(request, _error) {
      $('.loading').hide();
      $('#wrong-message').show();
    }
  });
}

function orderByDate(events) {
  events = events.sort(function (a, b) {
    return new Date(a.dtend) - new Date(b.dtend);
  });
  return events;
}

function filterOnlyToday() {
  $('li[day-start!="' + getToday() + '"]').toggle();
}

function getToday() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

function getTomorrow() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate() + 1),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

function addListenerFilters() {
  $('#day-start').attr('value', getToday());
  $('#district-filter').on('change', function () {
    var valueSelect = $($('#district-filter').find('option:selected')).text();
    applyFilters();
  });
  $('.filter').click(function () {
    //Buscar aquellos filtros activos
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }

    applyFilters();
  });
}

function applyFilters() {
  $('.date-separator').show();
  $('.date-separator').removeClass('first');
  $('.filter.selected').each(function () {
    filters.push($(this));
  });
  if ($('#district-filter').find('option:selected').text() != 'Distritos') filters.push($($('#district-filter').find('option:selected')));
  $('li').show(); //Mostramos todos para poder filtrar... ¿no tengo muy claro que sea la mejor solución?

  filters.forEach(function (filter_element) {
    var id = $(filter_element).attr('id');
  });
  filters.forEach(function (element) {
    var id = $(element).attr('id');
    var value = $(element).attr('value');
    var comparision = '!=';
    if (id === 'event-district') value = '"' + value + '"';
    var a = 'li:visible[' + id + comparision + value + ']';
    $(a).toggle();
  });
  $('li:visible').length === 0 ? $('#no-events').show() : $('#no-events').hide();
  $('.date-separator:not(:has(li:visible))').hide();
  $('.date-separator:visible').first().addClass('first');
  filters = [];
}

function addListenerCreator() {
  $('.padu').click(function () {
    window.open('https://www.instagram.com/padu.soy/');
  });
  $('.donate').click(function () {
    window.open('https://www.paypal.com/donate?hosted_button_id=R7NPDDXAEE4V6');
  });
}

var isToday = function isToday(date) {
  var today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

var isTomorrow = function isTomorrow(date) {
  var today = new Date();
  return date.getDate() === today.getDate() + 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

var isPastTomorrow = function isPastTomorrow(date) {
  var today = new Date();
  return date.getDate() === today.getDate() + 2 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

var isYesterday = function isYesterday(date) {
  var today = new Date();
  var dt = new Date(date);
  return dt < today;
};

function loadingAnim() {
  dotsAnim = window.setInterval(function () {
    var dots = $('#dots');
    if (dots.text().length > 3) dots.text('.');else dots.text(dots.text() + '.');
  }, 300);
}