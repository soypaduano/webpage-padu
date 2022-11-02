import {isYesterday, transformDateToString, getDistrict, eventHtml} from './utils.js'

const test = false;
const eventsNumber = 250;
let filters = [];

//Document Ready
$(document).ready(function () {
  if (!test) doRequestActividadesCulturales();
})

function readEventData(data) {
  let events = data['@graph']
  events = orderByDate(events);
  events = removeRepeatedEvents(events);
  let i = 0;
  events.forEach(element => {
    if(i > eventsNumber) return;
    let $copy = $(eventHtml);
    console.log(element.dtend);
    if (!addDayHour(element, $copy)) return; //Esto devuelve un valor porque a veces, devuelve eventos que han sido ayer.
    addTitleDescription(element, $copy);
    addTime(element, $copy);
    addAudience(element, $copy);
    addDistrict(element, $copy);
    addEventLocation(element, $copy);
    addPrice(element, $copy);
    appendEventToParentDate(element, $copy);
    //appendToList($copy);
    i++;
  });

  $('.loading').hide();
  addListenerFilters();
}

//Functions for event fill
function addDayHour(element, $copy) {
  //Obtenemos la fecha de inicio (todos los eventos la tienen)
  const dateStart = element['dtstart'];
  let dateEnd = element['dtend'];
  const dayStartFormatted = transformDateToString(dateStart.split(' ')[0]);

  element.dateFormatted = dayStartFormatted; //Le añadimos la fecha al elemento
  $($copy).attr('day-start', dateStart.split(' ')[0]);
  
  //Vemos si tiene recurrencia
  let recurrence = element['recurrence']; 

  
  if (recurrence) {
    dateEnd = transformDateToString(dateEnd.split(' ')[0]);
    $($copy).attr('dtend', "1"); //Esto sirve para el filter de varios días
    $($copy).find('.event-day-start').html(`<i class="fa-light fa-calendar-w"></i> De ${dayStartFormatted.toLocaleLowerCase()} a ${dateEnd.toLocaleLowerCase()}`);
  } else { //El evento no tiene recurrencia, por tanto, el día que termina es el día que empieza. 
    $($copy).find('.event-day-start').html(`<i class="fa-regular fa-calendar-days"></i> ${dayStartFormatted}`);
    dateEnd = dateStart;
  }

  element.dateEnd = transformDateToString(dateEnd);
  return (isYesterday(dateStart) || isYesterday(dateEnd)) ? false : true;
}

function addTime(element, $copy){
  const time = element['time'] ? element['time'] : 'Sin hora';
  $($copy).find('.event-hour').html(`<i class="fa-regular fa-clock"></i> ${time}`);
  $($copy).dateStart = element.dayStartFormatted;
}

function setAccesibility(){

}

function addTitleDescription(element, $copy) {
  $($copy).find('.event-title').html(`<a href="${element['link']}" target="_blank"> ${element['title']} </a>`);
  let description = (element['description'] === '') ? `Para ver más información, <a href="${element['link']}" target="_blank"> pincha aquí.</a>` : element['description']
  $($copy).find('.event-description').html(`${description}`);
  $($copy).attr('id', element['id']);
  $('.share-whatsapp').html(`<a href="whatsapp://send?text= He encontrado este evento. Fichalo. ${encodeURIComponent(element['link'])} target="_blank"> <i class="fa-brands fa-whatsapp"></i> </a>`);
}

function addAudience(element, $copy) {
  let audience = element['audience'];
  if (audience && ((audience === 'Niños' || audience === 'Niños,Familias' || audience === 'Jovenes,Niños' || audience === 'Familias' || audience === 'Jovenes' || audience === 'Familias,Mayores'))) {
    $($copy).attr('audience_kids', 0)
    $($copy).find('.event-audience').addClass('kids').html(`<i class="fa-solid fa-children"></i> Para niños`);
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

function addDistrict(element, $copy) {
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

  $($copy).attr('event-district', district.toUpperCase());
}

function addEventLocation(element,$copy) {
  let eventLocation = element['event-location'] ? element['event-location'] : 'Sin ubicación'
  $($copy).find('.event-location').html(`<a href=//maps.google.com/?q="${eventLocation}" target="_blank" style="${eventLocation === 'Sin ubicación' ? 'pointer-events: none; cursor: auto;' : ''}"> <i class="fa-solid fa-location-dot"></i> ${eventLocation} </a>`);
}

function addPrice(element, $copy) {
  let price = element['free'] ? 'Gratis' : element['price'];
  if (!price) price = 'Precio: Consultar en la web'
  $($copy).attr('free', element['free'] ? 1 : 0).find('.event-price').html(`<i class="fa-solid fa-euro-sign"></i> ${price}`);
}

function appendEventToParentDate(element, $copy){
  let date = element.dateEnd
  let $dateSeparator = $('.date-separator[day-start=' + date + ']')
  if(!$dateSeparator.length){
    $dateSeparator = $(`<div class="date-separator" day-start=${date}> <p class="text-date"> <i class="fa-regular fa-calendar-days"></i> ${date.replaceAll('-', '.')} </p> </div>`)
    $('#events-list').append($dateSeparator);
  } 
  $($dateSeparator).append($copy);
}

function appendToList($copy){
  $('#events-list').append($copy);
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

function addListenerFilters() {
  $('#date-filter').attr("min", getToday());
  $('#day-start').attr('value', getToday());


  $('#district-filter').on('change', function () {
    let value = $($('#district-filter').find('option:selected')).text();
    value != 'Distritos' ? $('#district-filter').addClass('selected') : $('#district-filter').removeClass('selected')
    applyFilters();
  });

  $('#date-filter').change(function() {
    $(this).val() != '' ? $(this).addClass('selected') : $(this).removeClass('selected');
    applyFilters();
});

  $('.filter').click(function () {
    $(this).hasClass('selected') ? $(this).removeClass('selected') : $(this).addClass('selected'); //Buscar aquellos filtros activos
    applyFilters();
  });
}

function applyFilters() {
  $('.date-separator').show();
  $('.date-separator').removeClass('first');
  $('.filter.selected').each(function () {
    filters.push($(this))
  });

  if($('#date-filter').val() != '') filters.push($('#date-filter'));
  if ($('#district-filter').find('option:selected').text() != 'Distritos') filters.push($($('#district-filter').find('option:selected')));
  $('li').show(); //Mostramos todos para poder filtrar... ¿no tengo muy claro que sea la mejor solución?

  filters.forEach(function (element) {
    let id = $(element).attr('id');
    let value = $(element).attr('value')
    let comparision = '!='; 
    if(id === 'date-filter'){
      //Filter date
      let $query = '.date-separator[day-start=' + transformDateToString(value) + ']';
      $('.date-separator').hide();
      $($query).show();
      return;
    }
    if (id === 'event-district') value = '"' + value + '"';
    let a = 'li:visible[' + id + comparision + value + ']'
    $(a).toggle();
  });

  $('li:visible').length === 0 ? $('#no-events').show() : $('#no-events').hide();
  $('.date-separator:not(:has(li:visible))').hide();
  $('.date-separator:visible').first().addClass('first');
  filters = [];
}

const getToday = () => {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}