var currentURL = window.location.href;
let url = currentURL + '/pytest';



  $(document).ready(function () {
    $.ajax({
      url: url,
      type: 'GET',
      complete: function (req, data, error) {},
      success: function (data) {
        console.log(data);
      },
      error: function (request, error) {
        console.log(error);
      }
    });
  })


function send_message() {setTimeout(function(){
  var div = document.createElement('div');
  div.textContent = document.getElementById('input_user').value;
  div.setAttribute('class', 'msg_out');
  document.getElementById('chat_msg').appendChild(div);
  }, 100);}

function write_response(){setTimeout(function(){
  var div = document.createElement('div');
  alert(chatBot(document.getElementById('input_user').value))
  div.textContent = chatBot(document.getElementById('input_user').value);
  div.setAttribute('class', 'msg_in');
  document.getElementById('chat_msg').appendChild(div)
  document.getElementById('input_user').value = '';
  document.getElementById('input_user').value = '';
  }, 200);
}

function scrollbottom() {setTimeout(function(){
  let elmnt=document.getElementById("chat_msg");
  elmnt.scrollTop=elmnt.scrollHeight;
}, 300)}

function openchat(){setTimeout(function(){
  var chatbox = document.getElementById("chatbox_support");
  if (chatbox.style.display === "none" || chatbox.style.display === '')
  {chatbox.style.display="block";} else{
      chatbox.style.display="none";}
  }, 100);}

function closechat(){setTimeout(function(){
  var chatbox = document.getElementById("chatbox_support");
  chatbox.style.display="none";
  }, 100);}
  
function chatBot(input) {

// current user input

var answer =respondTo(input)

/**
 * respondTo
 * 
 * return nothing to skip response
 * return string for one response
 * return array of strings for multiple responses
 * 
 * @param input - input chat string
 * @return reply of chat-bot
 */
function respondTo(input) {

  input = input.toLowerCase();



  if(match('(hi|hello|hey|hola|howdy)(\\s|!|\\.|$)', input))
    return "um... hi?";
  
  if(match('what[^ ]* up',input) || match('sup',input) || match('how are you',input))
    return "this github thing is pretty cool, huh?";
  
  if(match('l(ol)+',input) || match('(ha)+(h|$)',input) || match('lmao',input))
    return "what's so funny?";
  
  if(match('^no+(\\s|!|\\.|$)'), input)
    return "don't be such a negative nancy :(";
  
  if(match('(cya|bye|see ya|ttyl|talk to you later)', input))
    return ["alright, see you around", "good teamwork!"];
  
  if(match('(dumb|stupid|is that all)', input))
    return ["hey i'm just a proof of concept", "you can make me smarter if you'd like"];
  
  if(input == 'noop')
    return;
      
  return input + " what?"; 

}

/**
 * match
 * 
 * @param regex - regex string to match
 * @return boolean - whether or not the input string matches the regex
 */
function match(regex,input) {
    
  return new RegExp(regex).test(input);
}

return answer;
}

/* 
Send message automatically when enter pressed
The window onload function is necessary since the function takes 
the value before DOM is charged so it doesn't recognize the input
without this function.
*/
window.onload=function(){
  let input = document.getElementById('input_user');

  input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13){
            document.getElementById("myBtn").click();
          /*send_message(); write_response();*/
      };
}
      ); 
  let btn = document.getElementById("myBtn");
  btn.addEventListener("click", () => {
      send_message();
      write_response();
      scrollbottom();

  });
  }

