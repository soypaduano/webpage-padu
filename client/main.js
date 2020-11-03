var socket = io();

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
});



$.ajax({
  url : 'http://127.0.0.1:5000/secret',
  type : 'GET',
  dataType:'json',
  complete : function(req, data, error){
    console.log(req);
    console.log(data);
    console.log(error);
    debugger;
  },
  success : function(data) {              
      alert('Data: '+data);
  },
  error : function(request,error)
  {
    debugger;
      alert("Request: "+JSON.stringify(request));
  }
});


