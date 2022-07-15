
var test = false;
var dotsAnim, eventosActividadesCulturales, element, $copy;
var filters = [];

if (typeof window.orientation !== 'undefined') {
  console.log('is mobile');
} else {
  $('.one-day-event').addClass('desktop');
  $('.weekly-event').addClass('desktop');
}

let $oneDayEvent;
let $weeklyEvent;

if (!test) {
  $oneDayEvent = $('.one-day-event').remove();
  $weeklyEvent = $('.weekly-event').remove();
  $($oneDayEvent).hide();
  $($weeklyEvent).hide();
}


function addDayHour(element) {
  let recurrence = element['recurrence'];
  if (recurrence) {
    let dateEnd = element['dtend'];
    let dayEnd;
    if (!dateEnd) dateEnd = 'No hay fecha de fin'
    else dayEnd = dateEnd.split(' ')[0]
    dayEnd = transformDateToString(dayEnd)
    $($copy).find('.event-day-end').text('Fecha fin: ' + dayEnd);
    $($copy).attr('dtend', "1");
  } else {
    $copy = $oneDayEvent.clone();
    let time = element['time'];
    if (!time) time = 'Sin hora';
    $($copy).find('.event-hour').text('' + time);
  }
}

function addAudience(element) {
  let audience = element['audience'];
  if (audience && ((audience === 'Niños' || audience === 'Niños,Familias'))) {
    $($copy).attr('audience', 0)
    $($copy).find('.event-audience').text('Publico recomendado: ' + audience);
  } else {
    $($copy).attr('audience', 1)
    $($copy).find('.event-audience').remove();
  }
  console.log(audience);
  return audience;
}

function addDistrict(element) {
  let district = 'no-district'
  let postalcode = 'no-postal-code'
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
  $($copy).find('.event-title').text(element['title']);;
  let description = element['description'];
  if (description === '') {
    $($copy).find('.event-description').html('<p>Este evento no tiene descripción. Para ver más información, <a id="link-to-event"> pincha aquí.</a></p>')
    $($copy).find('.event-more-info').find('#link-to-event').remove();
  } else {
    $($copy).find('.event-description').text(description);
  }
  $($copy).attr('id', element['id']);
}

function addDayStart(element) {
  let dateStart = element['dtstart'];
  if (!dateStart) dateStart = 'No hay fecha de inicio'
  let dayStart = dateStart.split(' ');
  let dayStartFormat;
  dayStartFormat = transformDateToString(dayStart[0]);
  $($copy).find('.event-day-start').text('' + dayStartFormat);
  $($copy).attr('day', dayStart[0]);
}

function addEventLocation(element) {
  $($copy).find('.event-location').removeClass('none');
  let eventLocation = element['event-location'];
  if (!eventLocation) {
    eventLocation = 'Sin ubicación' //no location
    $($copy).find('.event-location').addClass('none');
  } else {
    $($copy).find('.event-location').click(function () {
      window.open("http://google.com/search?q=" + eventLocation);
    })
  }
  $($copy).find('.event-location').text(eventLocation);
}

function addPrice(element) {
  let free = element['free'];
  if (free) {
    price = 'Gratis'
  } else {
    price = element['price'];
    //Caso: no es free, pero no tiene precio
    if (!price) price = 'Precio: Consultar en la web'
    else price = '' + price;
  }
  $($copy).find('.event-price').text(price);
  $($copy).attr('free', free);
}

function addLink(element) {
  let link = element['link'];

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
  let uniqueArray = events.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i)
  return uniqueArray;
}


function readEventData(data) {
  //Evento de un día o evento de varios días?
  let events = data['@graph']
  events = orderByDate(events);
  let uniqueEvents = removeRepeatedEvents(events);

  uniqueEvents.forEach(element_ => {
    element = element_;
    //Day and Hour
    addDayHour(element);
    addDayStart(element);
    let audience = addAudience(element); //Audience
    addDistrict(element); //District
    addTitleDescription(element); //Event title and description
    addEventLocation(element) //event location
    addPrice(element);//Price
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
})


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
    complete: function (req, data, error) { },
    success: function (data) {
      readEventData(data);
    },
    error: function (request, error) {
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

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

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
      $(this).removeClass('selected')
    } else {
      $(this).addClass('selected');
    }
    applyFilters();
  });
}

function applyFilters() {

  $('.filter.selected').each(function () {
    filters.push($(this))
  });

  if($('#district-filter').find('option:selected').text() != 'DISTRITOS') filters.push($($('#district-filter').find('option:selected')));

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
    var value = $(element).attr('value')
    var comparision = '!=';

    if (id === 'event-district') value = '"' + value + '"';

    var a = 'li:visible[' + id + comparision + value + ']'
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

const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isTomorrow = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() + 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isPastTomorrow = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() + 2 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

function loadingAnim() {
  dotsAnim = window.setInterval(function () {
    let dots = $('#dots');
    console.log
    if (dots.text().length > 3)
      dots.text('.');
    else
      dots.text(dots.text() + '.')
  }, 300);
}