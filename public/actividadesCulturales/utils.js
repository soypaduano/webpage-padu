
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
  const dt = new Date(date);
  return dt < today;
}

const transformDateToString = (dateString) => {
  const dt = new Date(dateString);
  if (isToday(dt)) {
    return 'Hoy';
  } else if (isTomorrow(dt)) {
    return 'Mañana';
  } else {
    return '' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear();
  }
}

const getDistrict = (district) => {
  const parts = district.split('/');
  return parts.pop() || parts.pop(); // handle potential trailing slash
}

const eventHtml = `<li event-district="Latina" class="event-element" url="">
<div class="event-head">
  <div class="event-title">Un titulo así bien largote para poder diferenciar con el distrito y poder ver más cosas en la mediaquerie </div>
  <div class="share-whatsapp"></div>
</div>
<div class="event-district"></div>
<div class="event-content">
  <p class="event-description">Qui dolorem ipsum quia dolor sit amet, consectetur nobis est eligendi optio
    cumque nihil impedit.</p>
  <div class="event-data-container">
    <div class='event-small-data event-location'>@ Centro Cultural Conde Duque</div>
    <div class="event-small-data event-day-start">Día: 15-09-2020</div>
    <div class="event-small-data event-hour">Hora: <span>18:30</span> - <span>23:00</span></div>
    <div class="event-small-data event-price">Precio: 10 euros</div>
    <div class="event-small-data event-audience"></div>
    <div class="event-small-data event-accesibility"></div>
  </div>
</div>
</li>`


const gallery = ` 
<div class="image-title">
      <h3>Gaudí (hasta el 2 de Febrero)</h3>
    </div>
    <div class="images">
      <img class="mySlides" src="https://www.centrocentro.org/sites/default/files/styles/imagenes_medianas/public/activity/image/Sin%20t%C3%ADtulo_1.png?itok=rdxEvguW">
      <img class="mySlides" src="https://www.centrocentro.org/sites/default/files/styles/imagenes_medianas/public/activity/image/MadridDiversa%20web.jpg?itok=k9dlzvzw">
      <img class="mySlides" src="https://www.centrocentro.org/sites/default/files/styles/imagenes_medianas/public/activity/image/BANNERCENTRO_850X450.jpg?itok=lzquv6S9">
    </div>
`


export { isToday, isTomorrow, isYesterday, transformDateToString, getDistrict, eventHtml }