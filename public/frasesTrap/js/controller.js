//paleta de colores vaporwape: https://www.color-hex.com/color-palette/55041
var rapers = ["yung-beef", "pistoleros", "cecilio", "kidkeo", "misc"]
var soundPlayer;
var currentRapperNumber = 0;
var appendHtmlListElementExample;


createRappersSections();
createHowl();


function createHowl(){
}

function createRappersSections(){
  $('.list-group-item.test').clone(); //lo copio
  if(currentRapperNumber < rapers.length){
    fetch('frasesTrap/frases/frases-' + rapers[currentRapperNumber] + '.txt')
    .then(response => response.text())
    .then(text => fillFrases(text, rapers[currentRapperNumber]))
  } else {
    $('#plantilla-section').remove();
    $('.template').remove();
  }
}


function fillFrases(frases, currentRapper){
    var res = frases.split("\n");
    var section = addSectionOfRapper(currentRapper);
    for(var i = 0; i < res.length; i++){
      addHtmlAudioFila(res, i, section);
      i++;
    }
    currentRapperNumber++;
    createRappersSections();
    $('.list-group-item.test').remove();
}


function addSectionOfRapper(currentRapper){
  var section = $('#plantilla-section').clone();
  $(section).attr("id", "section-" + currentRapper);
  $('#container-rappers').append(section);
  $(section).find('.list-group').attr("id", currentRapper);
  changeTitleAndImage(section, currentRapper);
  return section;
}

function changeTitleAndImage(section, currentRapper){
  var height = 150;
  var width = 100;
  $(section).find('.raper-title').text(currentRapper);
  if(currentRapper == 'pistoleros'){
    width = 200;
  }
  var image = "<img src='frasesTrap/images/" + currentRapper + ".png' class='img-rounded rapper' width='" + width + "' height='" + height + "'></img>"
  $(section).find('.raper-title').append(image);
}

function addHtmlAudioFila(res, i, section){
  var htmlListElement = $('.template').find('.list-group-item').clone();
  $(htmlListElement).find('.frase-rapero').text(res[i]);
  $(htmlListElement).attr('id', res[++i]);
  addEventListenerPlayAudio(htmlListElement);
  addEventListenerDownloadAudio(htmlListElement);
  addEventListenerShare(htmlListElement);
  $(section).find('.list-group').append(htmlListElement);
}

//Listeners to buttons inside row.
function addEventListenerPlayAudio(listElement){
 $(listElement).find('.play-button').on('click touchstart', function () {

  var audioIdToPlay = $(this).parent().attr('id');
  var currentRappertoPlay = $(this).parent().parent().attr("id");
  if(soundPlayer){
    soundPlayer = checkSound(currentRappertoPlay, soundPlayer);
    if(soundPlayer.playing){
      soundPlayer.pause();
    }
  }

  soundPlayer = new Howl({
    src: ['frasesTrap/audios/' + currentRappertoPlay + '/' + audioIdToPlay + '.ogg','frasesTrap/audios/' + currentRappertoPlay + '/' + audioIdToPlay + '.mp3' ],
    volume: 3
  });

  soundPlayer.play();

 });

}

function checkSound(rapper, soundPlayer){
  if(rapper == "cecilio"){
    soundPlayer.volume = 0.2;
  } else {
    soundPlayer.volume = 3;
  }
  return soundPlayer;
}

function addEventListenerDownloadAudio(listElement){
  $(listElement).find('.download-button').on('click touchstart', function () {
    var audioIdToPlay = $(this).parent().attr('id');
    var currentRappertoPlay = $(this).parent().parent().attr("id");
    $(this).attr('href', "frasesTrap/audios/" + currentRappertoPlay + "/" + audioIdToPlay + ".ogg");
  });

}

function addEventListenerShare(listElement){
  $(listElement).find('.share-button').on('click touchstart', function () {
    var isMobile = {
      Android: function() {
      return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
      };
      if( isMobile.any() ) {
      var text = "Eyo, mira que risa esta web "
      var url = "www.frasesdeltrap.com"
      var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
      var whatsapp_url = "whatsapp://send?text=" + message;
      window.location.href = whatsapp_url;
      } else {
        var url = "www.frasesdeltrap.com";
        var text = "Escuchad todas las frases de raperos en www.frasesdeltrap.com";
        window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');    
      }
});

}

$( document ).ready(function() {
  $('#workWithUs').on('click touchstart', function () {
    soundPlayer = new Howl({
      src: ['audios/misc/gemidos.ogg'],
      volume: 3
    });
    soundPlayer.play();
    alert("Escribenos en @www_frasesdeltrap_com , pagamos €€€€");
  });
});
