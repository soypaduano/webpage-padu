
var dotsAnim;

let $oneDayEvent = $('.one-day-event').remove();
let $weeklyEvent = $('.weekly-event').remove();
$($oneDayEvent).hide();
$($weeklyEvent).hide();


/*var socket = io();
var form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var input = document.querySelector('#message');
  var text = input.value;
  socket.emit('message', text);
  input.value = '';
});

socket.on('message', function(text) {
  if (!text) {
    return;
  }
  var container = document.querySelector('section');
  var newMessage = document.createElement('p');
  newMessage.innerText = text;
  container.appendChild(newMessage);

  var seperator = document.createElement('br');
  container.appendChild(seperator);

  container.scrollTop = container.scrollHeight;
});*/

function readEventData(data){
  //Evento de un día o evento de varios días?
  let events = data['@graph'];
  events.forEach(element => {

    let $copy;
    let recurrence = element['recurrence'];
    if(recurrence){
      $copy = $weeklyEvent.clone();
      let dateEnd = element['dtend'];
      let dayEnd;
      if(!dateEnd) dateEnd = 'No hay fecha de fin'
      else  dayEnd = dateEnd.split(' ')[0]
      $('.event-day-end').text('Fecha fin: ' + dayEnd);
    } else {
      $copy = $oneDayEvent.clone();
      let time = element['time'];
      if(!time) time = 'Sin hora';
      $($copy).find('.event-hour').text('hora: ' + time);
    }
    
    //Audience
    let audience = element['audience'];
    if(audience) $($copy).find('event-audience').text(audience);

    //District
    let district = 'no-district'
    if(element['address']) district = getDistrict(element['address']['district']['@id']);
    $($copy).attr('district', district);


    //Event title and description
    $($copy).find('.event-title').text(element['title']); ;
    let description = element['description'];
    if(description === ''){
      $($copy).find('.event-description').html('<p>Para ver la descripción, pincha aquí: <a id="link-to-event">+ info</a></p>')
      $($copy).find('.event-more-info').remove();
    } else {
      $($copy).find('.event-description').text(description);
    }

    //id
    $($copy).attr('id', element['id']);


    let dateStart = element['dtstart'];
    if(!dateStart) dateStart = 'No hay fecha de inicio'
    let dayStart = dateStart.split(' ');
    $($copy).find('.event-day-start').text('Fecha inicio: ' + dayStart[0]);  
    $($copy).attr('day', dayStart[0]);
    
    //event location
    let eventLocation = element['event-location'];
    if(!eventLocation){
      eventLocation = 'Sin ubicación'
      $($copy).find('.event-location').addClass('none');
    } 
    $($copy).find('.event-location').text(eventLocation);

   
    //Price
    let free = element['free'];
    if(free) price = 'Gratis'
    else price = element['price'];
    $($copy).find('.event-price').text(price);
    $($copy).attr('free', free);

    //Link
    let link = element['link'];  
    $($copy).find('#link-to-event').click(function () {
      window.open(link);
    });
  
    $('#events-list').append($copy);
    $($copy).show();

  });

  $('.loading').hide();
  clearInterval(dotsAnim);
}


function getDistrict(district){
  var parts = district.split('/');
  var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
  return lastSegment;
}


$(document).ready(function(){
  loadingAnim();
  doEventsRequest();
})

function doEventsRequest(){
  $.ajax({
    url : 'http://127.0.0.1:5000/datos',
    type : 'GET',
    dataType:'json',
    complete : function(req, data, error){
    },
    success : function(data) {
      readEventData(data);
    },error : function(request,error){
  
    }
  });
  
}

function loadingAnim(){
dotsAnim = window.setInterval( function() {
    let dots = $('#dots');
    debugger;
    console.log
    if ( dots.text().length > 3 ) 
        dots.text('.');
    else 
        dots.text(dots.text() + '.')
    }, 300);
}

