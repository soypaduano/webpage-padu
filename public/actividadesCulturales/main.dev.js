"use strict";

var test = false;
var dotsAnim, eventosActividadesCulturales, element, $copy;
var filters = [];

if (typeof window.orientation !== 'undefined') {
  console.log('is mobile');
} else {
  $('.one-day-event').addClass('desktop');
  $('.weekly-event').addClass('desktop');
}

var $oneDayEvent;
var $weeklyEvent;

if (!test) {
  $oneDayEvent = $('.one-day-event').remove();
  $weeklyEvent = $('.weekly-event').remove();
  $($oneDayEvent).hide();
  $($weeklyEvent).hide();
}

function addDayHour(element) {
  var recurrence = element['recurrence'];

  if (recurrence) {
    var dateEnd = element['dtend'];
    var dayEnd;
    if (!dateEnd) dateEnd = 'No hay fecha de fin';else dayEnd = dateEnd.split(' ')[0];
    dayEnd = transformDateToString(dayEnd);
    $($copy).find('.event-day-end').text('Fecha fin: ' + dayEnd);
    $($copy).attr('dtend', "1");
  } else {
    $copy = $oneDayEvent.clone();
    var time = element['time'];
    if (!time) time = 'Sin hora';
    $($copy).find('.event-hour').text('hora: ' + time);
  }
}

function addAudience(element) {
  var audience = element['audience'];

  if (audience && (audience === 'Niños' || audience === 'Niños,Familias')) {
    $($copy).attr('audience', 0);
    $($copy).find('.event-audience').text('Publico recomendado: ' + audience);
  } else {
    $($copy).attr('audience', 1);
  }

  console.log(audience);
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

    $($copy).find('.event-district').text(district);
  }

  district = district.toUpperCase();
  $($copy).attr('event-district', district);
}

function addTitleDescription(element) {
  $($copy).find('.event-title').text(element['title']);
  ;
  var description = element['description'];

  if (description === '') {
    $($copy).find('.event-description').html('<p>Este evento no tiene descripción. Para ver más información, pincha aquí: <a id="link-to-event">+ INFO</a></p>');
    $($copy).find('.event-more-info').find('#link-to-event').remove();
  } else {
    $($copy).find('.event-description').text(description);
  }

  $($copy).attr('id', element['id']);
}

function addDayStart(element) {
  var dateStart = element['dtstart'];
  if (!dateStart) dateStart = 'No hay fecha de inicio';
  var dayStart = dateStart.split(' ');
  var dayStartFormat;
  dayStartFormat = transformDateToString(dayStart[0]);
  $($copy).find('.event-day-start').text('Fecha inicio: ' + dayStartFormat);
  $($copy).attr('day', dayStart[0]);
}

function addEventLocation(element) {
  var eventLocation = element['event-location'];

  if (!eventLocation) {
    eventLocation = 'Sin ubicación';
    $($copy).find('.event-location').addClass('none');
  } else {
    $($copy).find('.event-location').click(function () {
      window.open("http://google.com/search?q=" + eventLocation);
    });
  }

  $($copy).find('.event-location').text(eventLocation);
}

function addPrice(element) {
  var free = element['free'];

  if (free) {
    price = 'Precio: Gratis';
  } else {
    price = element['price']; //Caso: no es free, pero no tiene precio

    if (!price) price = 'Precio: Consultar en la web';else price = 'Precio:' + price;
  }

  $($copy).find('.event-price').text(price);
  $($copy).attr('free', free);
}

function addLink(element) {
  var link = element['link'];
  $($copy).find('#link-to-event').click(function () {
    window.open(link);
  });
  $($copy).find('.shareWhatsapp').click(function () {
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

function readEventData(data) {
  //Evento de un día o evento de varios días?
  var events = data['@graph'];
  events = orderByDate(events);
  var uniqueEvents = removeRepeatedEvents(events);
  uniqueEvents.forEach(function (element_) {
    element = element_; //Day and Hour

    addDayHour(element);
    addDayStart(element);
    var audience = addAudience(element); //Audience

    addDistrict(element); //District

    addTitleDescription(element); //Event title and description

    addEventLocation(element); //event location

    addPrice(element); //Price

    addLink(element); //Link

    $('#events-list').append($copy);

    if (!(audience === 'Niños' || audience === 'Niños,Familias' || audience == 'Jovenes' || audience == 'Familias')) {
      $($copy).show();
    }
  });
  $('.loading').hide();
  clearInterval(dotsAnim);
  addListenerFilters();
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
  } else if (isPastTomorrow(dt)) {
    return 'Pasado Mañana';
  } else {
    return dateString;
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
  $('li[day!="' + getToday() + '"]').toggle();
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

function addListenerFilters() {
  $('#day').attr('value', getToday());
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
  $('.filter.selected').each(function () {
    filters.push($(this));
  });
  if ($('#district-filter').find('option:selected').text() != 'DISTRITOS') filters.push($($('#district-filter').find('option:selected')));
  var audience = false;
  filters.forEach(function (element) {
    var id = $(element).attr('id');
    if (id === 'audience') audience = true;
  });

  if (audience) {
    $('li').show();
  } else {
    $('li[audience=0]').hide();
    $('li[audience=1]').show();
  }

  filters.forEach(function (element) {
    var id = $(element).attr('id');
    var value = $(element).attr('value');
    var comparision = '!=';
    if (id === 'event-district') value = '"' + value + '"';
    var a = 'li:visible[' + id + comparision + value + ']';
    $(a).toggle();
  });
  $('li:visible').length === 0 ? $('#no-events').show() : $('#no-events').hide();
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

function loadingAnim() {
  dotsAnim = window.setInterval(function () {
    var dots = $('#dots');
    console.log;
    if (dots.text().length > 3) dots.text('.');else dots.text(dots.text() + '.');
  }, 300);
}