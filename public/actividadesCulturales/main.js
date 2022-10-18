
import {isToday, isTomorrow, isYesterday, getToday, transformDateToString, getDistrict, eventHtml} from './utils.js'

let test = false;
let dotsAnim, element, $copy;
let filters = [];

//Document Ready
$(document).ready(function () {
  loadingAnim();
  if (!test) doRequestActividadesCulturales();
})

function readEventData(data) {
  let events = data['@graph']
  events = orderByDate(events);
  events = removeRepeatedEvents(events);

  events.forEach(element => {
    $copy = $(eventHtml);
    if (!addDayHour(element)) return; //Esto devuelve un valor porque a veces, devuelve eventos que han sido ayer.
    addTitleDescription(element);
    let audience = addAudience(element);
    addDistrict(element);
    addEventLocation(element);
    addPrice(element);
    appendEventToParentDate($copy, element);
  });

  $('.loading').hide();
  clearInterval(dotsAnim);
  addListenerFilters();
}

function appendEventToParentDate($copy, element){
  let date = element.dateEnd
  let $dateSeparator = $('.date-separator[datestart=' + date + ']')
  if(!$dateSeparator.length){
    $('#events-list').append($(`<div class="date-separator" datestart=${date}> <p class="text-date"> <i class="fa-regular fa-calendar-days"></i> ${date.replaceAll('-', '.')} </p> </div>`));
  } 
  $($dateSeparator).append($copy);
  $($copy).show();
}

function addDayHour(element) {
  //Obtenemos la fecha de inicio (todos los eventos la tienen)
  let dateStart = element['dtstart'];
  if (!dateStart) dateStart = 'No hay fecha de inicio'
  let dayStart = transformDateToString(dateStart.split(' ')[0]);
  element.date = dayStart; //Le añadimos la fecha al elemento
  $($copy).attr('day-start', dateStart.split(' ')[0]);
  //Vemos si tiene recurrencia
  let recurrence = element['recurrence']; 

  let dateEnd;
  if (recurrence) {
    dateEnd = element['dtend'];
    if (!dateEnd) dateEnd = 'No hay fecha de fin'
    else dateEnd = transformDateToString(dateEnd.split(' ')[0]);
    $($copy).attr('dtend', "1");
    $($copy).find('.event-day-start').html(`<i class="fa-light fa-calendar-w"></i> De ${dayStart.toLocaleLowerCase()} a ${dateEnd.toLocaleLowerCase()}`);
  } else { //El evento no tiene recurrencia, por tanto, el día que termina es el día que empieza. 
    $($copy).find('.event-day-start').html(`<i class="fa-regular fa-calendar-days"></i> ${dayStart}`);
    dateEnd = dayStart;
  }

  element.dateEnd = dateEnd;
  if(isYesterday(dateStart) || isYesterday(dateEnd)) return false;   //Tanto como si el evento empezaba ayer o terminaba ayer, quiere decir que está terminado. 

  //Le añadimos la hora de inicio 
  let time = element['time'];
  if (!time) time = 'Sin hora';
  $($copy).find('.event-hour').html(`<i class="fa-regular fa-clock"></i> ${time}`);
  $($copy).dateStart = dayStart;
  return true;
}

function addAudience(element) {
  let audience = element['audience'];
  if (audience && ((audience === 'Niños' || audience === 'Niños,Familias' || audience === 'Jovenes,Niños' || audience === 'Familias' || audience === 'Jovenes' || audience === 'Familias,Mayores'))) {
    $($copy).attr('audience_kids', 0)
    $($copy).find('.event-audience').html(`<i class="fa-solid fa-children"></i> Para niños`);
  } else if (audience && ((audience === 'Mujeres' || audience === 'Mujeres,Familias' || audience === 'Mujeres,Familias'))) {
    $($copy).attr('audience_woman', 0)
    $($copy).find('.event-audience').addClass('feminismo').html('<i class="fa-solid fa-venus"></i> Feminismo');
  } else {
    $($copy).attr('audience_kids', 1);
    $($copy).attr('audience_woman', 1);
    $($copy).find('.event-audience').remove();
  }
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
    $($copy).find('.event-district').html(`<i class="fa-solid fa-tree-city"></i> ${district.replace(/([A-Z])/g, ' $1').trim().replace('- ', '-')}`);
  }
  district = district.toUpperCase();
  $($copy).attr('event-district', district);
}

function addTitleDescription(element) {
  $($copy).find('.event-title').html(`<a href="${element['link']}" target="_blank"> ${element['title']} </a>`);
  let description = element['description'];
  if ( description === '') {
    $($copy).find('.event-description').html(`<p>Para ver más información, <a href="${element['link']}" target="_blank"> pincha aquí.</a></p>`)
  } else {
    $($copy).find('.event-description').text(description);
  }

  $($copy).attr('id', element['id']);
  $('.share-whatsapp').html(`<a href="whatsapp://send?text= He encontrado este evento. Fichalo. ${encodeURIComponent(element['link'])} target="_blank">Compartir</a> <i class="fa-brands fa-whatsapp"></i>`)

}

function addEventLocation(element) {
  let eventLocation = element['event-location'];
  if (!eventLocation) {
    eventLocation = 'Sin ubicación' //no location
    $($copy).find('.event-location').addClass('none');
  } else {
    $($copy).find('.event-location').click(function () {
      window.open("http://maps.google.com/?q=" + eventLocation);
    })
  }
  $($copy).find('.event-location').html(`<i class="fa-solid fa-location-dot"></i> ${eventLocation}`);
}

function addPrice(element) {
  let free = element['free'];
  let price;
  if (free) {
    price = 'Gratis'
  } else {
    price = element['price'];
    //Caso: no es free, pero no tiene precio
    if (!price) price = 'Precio: Consultar en la web'
    else price = '' + price;
  }
  $($copy).find('.event-price').html(`<i class="fa-solid fa-euro-sign"></i> ${price}`);
  $($copy).attr('free', free);
}

//Request Functions
function doRequestActividadesCulturales() {
  let urlEvents = window.location.href + '/request';
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

//Events Sorting and Filtering 
function orderByDate(events) {
  return events.sort(function (a, b) {
    return new Date(a.dtend) - new Date(b.dtend);
  });
}

function removeRepeatedEvents(events) {
  return events.filter((v, i, a) => a.findIndex(t => (t.title === v.title)) === i)
}

//Filter Functions
function filterOnlyToday() {
  $('li[day-start!="' + getToday() + '"]').toggle();
}

function addListenerFilters() {
  $('#day-start').attr('value', getToday());
  $('#district-filter').on('change', function () {
    let valueSelect = $($('#district-filter').find('option:selected')).text();
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

  $('.date-separator').show();
  $('.date-separator').removeClass('first');
  $('.filter.selected').each(function () {
    filters.push($(this))
  });

  if ($('#district-filter').find('option:selected').text() != 'Distritos') filters.push($($('#district-filter').find('option:selected')));
  $('li').show(); //Mostramos todos para poder filtrar... ¿no tengo muy claro que sea la mejor solución?

  filters.forEach(function (filter_element) {
    let id = $(filter_element).attr('id');
  });

  filters.forEach(function (element) {
    let id = $(element).attr('id');
    let value = $(element).attr('value')
    let comparision = '!=';

    if (id === 'event-district') value = '"' + value + '"';

    let a = 'li:visible[' + id + comparision + value + ']'
    $(a).toggle();
  });

  $('li:visible').length === 0 ? $('#no-events').show() : $('#no-events').hide();
  $('.date-separator:not(:has(li:visible))').hide();
  $('.date-separator:visible').first().addClass('first');
  filters = [];
}

//Animation Functions
function loadingAnim() {
  dotsAnim = window.setInterval(function () {
    let dots = $('#dots');
    if (dots.text().length > 3)
      dots.text('.');
    else
      dots.text(dots.text() + '.')
  }, 300);
}