var currentURL = window.location.href;
let url = currentURL + '/pytest';



function doInputRequest(input) {
  alert(input);
  $.ajax({
    url: url,
    type: 'GET',
    data: {'input': input},
    complete: function (req, data, error) { },
    success: function (data) {
      write_response(data);
      return data;
    },
    error: function (request, error) {
      console.log(error);
    }
  });
}

window.onload = function () {
  let input = document.getElementById('input_user');

  input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      document.getElementById("myBtn").click();

    };
  }
  );
  let btn = document.getElementById("myBtn");
  btn.addEventListener("click", () => {
    let input = send_message();
    doInputRequest(input);
  });
}

function send_message() {
  var div = document.createElement('div');
  div.textContent = document.getElementById('input_user').value;
  div.setAttribute('class', 'msg_out');
  document.getElementById('chat_msg').appendChild(div);
  return document.getElementById('input_user').value;
}

function write_response(response) {
  setTimeout(function () {
    var div = document.createElement('div');
    div.textContent = response;
    div.setAttribute('class', 'msg_in');
    document.getElementById('chat_msg').appendChild(div)
    document.getElementById('input_user').value = '';
    document.getElementById('input_user').value = '';
  }, 200);
}

function scrollbottom() {
  setTimeout(function () {
    let elmnt = document.getElementById("chat_msg");
    elmnt.scrollTop = elmnt.scrollHeight;
  }, 300)
}

function openchat() {
  setTimeout(function () {
    var chatbox = document.getElementById("chatbox_support");
    if (chatbox.style.display === "none" || chatbox.style.display === '') { chatbox.style.display = "block"; } else {
      chatbox.style.display = "none";
    }
  }, 100);
}

function closechat() {
  setTimeout(function () {
    var chatbox = document.getElementById("chatbox_support");
    chatbox.style.display = "none";
  }, 100);
}

