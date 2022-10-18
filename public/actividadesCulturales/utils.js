
//Date Events
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

const isYesterday = (date) => {
    const today = new Date()
    let dt = new Date(date);
    return dt < today;
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

  let transformDateToString =  (dateString) => {
    let dt = new Date(dateString);
    if (isToday(dt)) {
      return 'Hoy';
    } else if (isTomorrow(dt)) {
      return 'Mañana';
    } else {
      return '' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear();
    }
  }

  let getDistrict = (district) =>  {
    let parts = district.split('/');
    let lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    return lastSegment;
  }




let eventHtml = `<li event-district="Latina" class="event-element" url="">
<div class="event-head">
  <div class="event-title">Un titulo así bien largote para poder diferenciar con el distrito y poder ver más
    cosas en la mediaquerie</div>
  <div class="event-district">Hortaleza</div>
</div>
<p class="event-description">Qui dolorem ipsum quia dolor sit amet, consectetur nobis est eligendi optio
  cumque nihil impedit.</p>
<div class="event-data-container">
  <div class='event-small-data event-location'>@ Centro Cultural Conde Duque</div>
  <div class="event-small-data event-day-start">Día: 15-09-2020</div>
  <div class="event-small-data event-hour">Hora: <span>18:30</span> - <span>23:00</span></div>
  <div class="event-small-data event-price">Precio: 10 euros</div>
  <div class="event-small-data event-audience"></div>
  <div class="event-small-data share-whatsapp">Compartir<i class="fa-brands fa-whatsapp"></i> </div>
</div>
</li>`


export { isToday, isTomorrow, isYesterday, getToday, transformDateToString, getDistrict, eventHtml }
