var dotsAnim;
var test = false;

var eventosActividadesCulturales;
var eventosBibliotecas;

if (typeof window.orientation !== 'undefined') { 
  console.log('is mobile');
 } else {
  $('.one-day-event').addClass('desktop');
  $('.weekly-event').addClass('desktop');
 }

 let $oneDayEvent;
 let $weeklyEvent;

 if(!test){
  $oneDayEvent = $('.one-day-event').remove();
  $weeklyEvent = $('.weekly-event').remove();
  $($oneDayEvent).hide();
  $($weeklyEvent).hide();
 }



function readEventData(data) {
  //Evento de un día o evento de varios días?
  let events = data['@graph'];
  events = orderByDate(events);
  events.forEach(element => {
    let $copy;
    let recurrence = element['recurrence'];
    if (recurrence) {
      $copy = $weeklyEvent.clone();
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
      $($copy).find('.event-hour').text('hora: ' + time);
    }

    //Audience
    let audience = element['audience'];
    if (audience && ((audience === 'Niños' || audience === 'Niños,Familias'))){
      $($copy).attr('audience', 0)
      $($copy).find('.event-audience').text('Publico recomendado: ' + audience);
    } else {
      $($copy).attr('audience', 1)
    }

    //District
    let district = 'no-district'
    let postalcode = 'no-postal-code'
    if (element['address']) {
      district = getDistrict(element['address']['district']['@id']);
      if (element['address' ['area']] && element['address']['area']['postal-code']) {
        postalcode = element['address']['area']['postal-code'];
        $($copy).find('.event-district').text(district + ', ' + postalcode);
      }

      $($copy).find('.event-district').text(district);
    }
    district = district.toUpperCase();
    $($copy).attr('event-district', district);


    //Event title and description
    $($copy).find('.event-title').text(element['title']);;
    let description = element['description'];
    if (description === '') {
      $($copy).find('.event-description').html('<p>Este evento no tiene descripción. Para ver más información, pincha aquí: <a id="link-to-event">+ info</a></p>')
      $($copy).find('.event-more-info').remove();
    } else {
      $($copy).find('.event-description').text(description);
    }

    //id
    $($copy).attr('id', element['id']);

    //Date Start 
    let dateStart = element['dtstart'];
    if (!dateStart) dateStart = 'No hay fecha de inicio'
    let dayStart = dateStart.split(' ');
    let dayStartFormat;
    dayStartFormat = transformDateToString(dayStart[0]);
    $($copy).find('.event-day-start').text('Fecha inicio: ' + dayStartFormat );
    $($copy).attr('day', dayStart[0]);

    //event location
    let eventLocation = element['event-location'];
    if (!eventLocation) {
      eventLocation = 'Sin ubicación'
      $($copy).find('.event-location').addClass('none');
    } else {
      $($copy).find('.event-location').click(function () {
        window.open("http://google.com/search?q=" + eventLocation);
      })
    }
    $($copy).find('.event-location').text(eventLocation);


    //Price
    let free = element['free'];
    if (free) {
      price = 'Precio: Gratis'
    } else {
      price = element['price'];
      //Caso: no es free, pero no tiene precio
      if (!price) price = 'Precio: Consultar en la web'
      else price = 'Precio:' + price;
    }

    //No es free, pero no tiene precio  
    $($copy).find('.event-price').text(price);
    $($copy).attr('free', free);

    //Link
    let link = element['link'];
    $($copy).find('#link-to-event').click(function () {
      window.open(link);
    });

    $('#events-list').append($copy);


    if(!(audience === 'Niños' || audience === 'Niños,Familias')){
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

function transformDateToString(dateString){
  var dt=new Date(dateString);
  if(isToday(dt)) {
    return 'Hoy';
  } else if(isTomorrow(dt)) {
    return 'Mañana';
  } else {
    return dateString;
  }
}

$(document).ready(function () {
  loadingAnim();
  addListenerCreator();
  if(!test) doRequestActividadesCulturales();
})


function doRequestActividadesCulturales(){
  var currentURL = window.location.href;
  var urlEvents = currentURL + '/request';
  doEventsRequest(urlEvents);
}

function doEventsRequest(url) {
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    complete: function (req, data, error) {},
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
  $('.filter').click(function () {
    //Buscar aquellos filtros activos
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected')
    } else {
      $(this).addClass('selected');
    }
    var filters = [];
    $('.filter.selected').each(function () {
      filters.push($(this))
    });

    //Dropdown filter
    var valueSelect = $($('#district-filter').find('option:selected')).text();
    if(valueSelect !== 'DISTRITOS') filters.push($($('#district-filter').find('option:selected')));
    applyFilters(filters);
  });



  $('.filter-container').find('select').change(function () {
    var filters = [];
    //Les pasamos los seleccionados. 
    $('.filter.selected').each(function () {
      filters.push($(this))
    })
    
    //Dropdown filter
    var valueSelect = $($(this).find('option:selected')).text();
    if(valueSelect !== 'DISTRITOS') filters.push($($(this).find('option:selected')))

    applyFilters(filters);
  })
}

function applyFilters(filters) {
  var audience = false;
  filters.forEach(function (element) {
    var id = $(element).attr('id');
    if(id === 'audience') audience = true;
  });

  if(audience){
    $('li').show();
  } else {
    $('li[audience=0]').hide();
    $('li[audience=1]').show();
  }

  filters.forEach(function (element) {
    var id = $(element).attr('id');
    var value = $(element).attr('value')
    var comparision = '!=';

    if(id === 'event-district') value = '"' + value + '"';

    var a = 'li:visible[' + id + comparision + value + ']'
    $(a).toggle();
  });

  $('li:visible').length === 0 ? $('#no-events').show() :  $('#no-events').hide();
}

function addListenerCreator() {
  $('.padu').click(function () {
    window.open('https://www.paypal.com/donate?hosted_button_id=R7NPDDXAEE4V6');
    window.open('https://www.instagram.com/padu.soy/');
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