let timeStarted = false, sec = 0, password = "", confirmPassword = "", minutes = 0, seconds = 0;
let gamePassed = false;
let puedePulsarF = false; fPulsado = false; //f respects tool

$(document).ready(function () {
  if (typeof window.orientation !== 'undefined') {
    alert("Por una mejor experiencia de usuario, te recomendamos que juegues desde un navegador desktop");
    $('footer').hide();
  }
  seePasswordListener();
  listenerToRegister();
  inputTextChanged();
  checkErrors();
  $("#textPassword").focus();
  $("#textPassword").select();
  $('[data-toggle="tooltip"]').tooltip()
});


function addNewError(errorMessage, id){
  errorTemplate = "<li id='" + id + "' class='error animated bounceInUp'><span></span><p class='errorText'>" + errorMessage + "</p></li>"
  $(errorTemplate).prependTo('#error-list');
}

function setCorrect(id){
  $('#' + id).removeClass('error animated bounceInUp');
  if(!$('#' + id).hasClass('fadeIn')){
    $('#' + id).addClass('correct animated fadeIn');
  } 
  let lastError = $('#error-list .error').slice(-1)[0];
  $('#' + id).insertAfter(lastError);
}

function updateCorrectToErrorAgain(id){
  if($('#' + id).hasClass('correct')){
    $('#' + id).removeClass('correct animated fadeIn');
    $('#' + id).prependTo('#error-list');
    $('#' + id).addClass('error animated bounceInUp');
  }
}

function inputTextChanged() {
  $('#textPassword').on('input', function (e) {
    if(!timeStarted) startTimer();
    password = $(this).val();
    checkErrors();
  });

  $('#textPasswordConfirm').on('input', function (e) {
    confirmPassword = $(this).val();
    checkErrors();
  });

}

function checkErrors(){

  let allCorrects = true;
  for(let i = 0; i < Object.entries(errorsToCheck).length; i++){
    let element = Object.entries(errorsToCheck)[i];
    let id = element[0];
    let func = element[1].function;
    let onTheList = element[1].onTheList;
    let message = element[1].message;

    if(onTheList){
      if(func()){
        setCorrect(id);
      } else {
        $('#registerButton').removeClass("animated infinite bounce delay-1s");
        updateCorrectToErrorAgain(id);
        allCorrects = false;
      }
    }

    if(!onTheList && allCorrects){
      if(func()){
        addNewError(message, id);
        element[1].onTheList = true;
        setCorrect(id);
      } else {
        addNewError(message, id);
        element[1].onTheList = true;
        return;
      }
    }
  }

  if(allCorrects) activateConfirmPassword();
}

function activateConfirmPassword(){
  if(password === confirmPassword){
    $('#registerButton').removeClass('blocked');
    $('#registerButton').addClass('animated infinite bounce delay-1s');
  } else {
    $('.main-input-container.confirmPassword').show();
    $('.main-input-container.confirmPassword').addClass('animated bounceIn');
    errorsToCheck["confirmPassword"] = {
        "function": () => {
          return password === confirmPassword;
        }, 
        "onTheList": false,
        "message": "Las contraseñas deben coincidir 😉",
        "correct": false
    }
    checkErrors();
  }
  
};

function startTimer(){
  timeStarted = true;
    setInterval( function(){
      seconds = pad(++sec%60);
      minutes = pad(parseInt(sec/60,10));
      $('#timeText').text(minutes + ":" + seconds);
    }, 1000);
}

function addOneToCounter(){
  ++totalSeconds;
}

function seePasswordListener() {
  $('#seePassword').on('click touch', function () {
    let $textPassword = $('#textPassword');

    if ($($textPassword).attr("type") === "password") {
      $($textPassword).attr("type", "text");
      $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close')
    } else {
      $($textPassword).attr("type", "password");
      $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open')
    }
  });
}

function listenerToRegister(){
  $('#registerButton').on('click touch', function () {
    let $this = this;
    if(password != confirmPassword || password === ""){
      $(this).addClass('animated wobble');
      $('.main-input-container').addClass('error');
      setTimeout(function () { 
          $($this).removeClass('animated wobble');
          $('.main-input-container').removeClass('error');
      }, 1000);
    } else {
      let name = prompt("Introduce tu nombre");
      alert(name + " se ha registrado correctamente con un tiempo de " + minutes + "mins y " + seconds + "secs" )
      $('#timeText').hide();
      $('#registerButton').removeClass('animated infinite bounce delay-1s');
      $('#creator').show();
    }
  });
}

//Correct error list
let errorsToCheck = {
  "withOneNumber": {
    "function": () => {
      return /\d/.test(password);
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un número.",
    "correct": false
  },
  "twoCaps": {
    "function": () => {
      return countUpperCaseChars(password) >= 2
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener al menos 2 mayusculas",
    "correct": false
  },
  "hasPercentage": {
    "function": () => {
      return password.includes('%');
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener el símbolo de %",
    "correct": false
  },
  "longerThan8": {
    "function": () => {
      return password.length > 8;
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener más de 8 caracteres",
    "correct": false
  },
  "currentMinute": {
    "function": () => {
      console.log(minutes);
      return password.includes(minutes);
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener los minutos actuales del contador de arriba",
    "correct": false
  },
  "todayYear": {
    "function": () => {
      let today = new Date();
      var yyyy = today.getFullYear();
      return password.includes(yyyy);
    }, 
    "onTheList": false,
    "message": "Debe contener el año en el que estamos",
    "correct": false
  },
  "FtoPayRespects": {
    "function": () => {
      puedePulsarF = true;
      return fPulsado;
    }, 
    "onTheList": false,
    "message": "Pulsa F para dar respetos",
    "correct": false
  },
  "endsWithB": {
    "function": () => {
      return password[password.length - 1] === 'b';
    }, 
    "onTheList": false,
    "message": "La contraseña debe acabar con la letra 'b'",
    "correct": false
  },
  "Zletter": {
    "function": () => {
      return password.includes('zz') || password.includes('ZZ') || password.includes('zZ') || password.includes('Zz');
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener la letra z dos veces seguida",
    "correct": false
  },
  "squareRoot81": {
    "function": () => {
      return password.includes('9');
    }, 
    "onTheList": false,
    "message": "La contraseña debe incluir la raíz cuadrada de 81",
    "correct": false
  },
  "semiEndsWithExclamation": {
    "function": () => {
      return password[password.length - 2] === '!';
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un '!' en la penúltima posición",
    "correct": false
  },
  "startWithCaps": {
    "function": () => {
      return /[A-Z]/.test(password[0]);
    }, 
    "onTheList": false,
    "message": "La contraseña debe empezar por mayusculas",
    "correct": false
  },
  "noVocal": {
    "function": () => {
      let passCopy = password.toUpperCase();
      return !passCopy.includes('A') && !passCopy.includes('E') && !passCopy.includes('I') && !passCopy.includes('O') && !passCopy.includes('U')
    }, 
    "onTheList": false,
    "message": "La contraseña no puede tener vocales",
    "correct": false
  },
  "smallerThan15": {
    "function": () => {
      return password.length < 14;
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener menos de 14 caracteres",
    "correct": false
  }
}

//Object errors for testing
let errorsTest = {
  "withOneNumber": {
    "function": () => {
      return /\d/.test(password);
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener un número."
  },
  "twoCaps": {
    "function": () => {
      return countUpperCaseChars(password) >= 2
    }, 
    "onTheList": false,
    "message": "La contraseña debe contener al menos 2 mayusculas"
  },
  "longerThan8": {
    "function": () => {
      return password.length > 8;
    }, 
    "onTheList": false,
    "message": "La contraseña debe tener más de 8 caracteres"
  },
  "todayYear": {
    "function": () => {
      let today = new Date();
      var yyyy = today.getFullYear();
      return password.includes(yyyy);
    }, 
    "onTheList": false,
    "message": "Debe contener el año en el que estamos"
  }
}



//Utils
/* No necesito está funcion más
function isEmoji(str) {
  var ranges = [
      '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
  ];
  if (str.match(ranges.join('|'))) {
      return true;
  } else {
      return false;
  }
}*/

function countUpperCaseChars(str) {
  var count=0,len=str.length;
  for(var i=0;i<len;i++) {
    if(/[A-Z]/.test(str.charAt(i))) count++;
  }
  return count;
}

function pad ( val ) { return val > 9 ? val : "0" + val; }

document.addEventListener('keyup', (e) => {
  if(puedePulsarF){
    if (e.code === "KeyF") {
      fPulsado = true;
      checkErrors();
  }
}
});