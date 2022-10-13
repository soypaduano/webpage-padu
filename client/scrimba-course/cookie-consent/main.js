
let delay = 1500;
let modal = document.getElementById('modal');
let modalClose = document.getElementById('modal-close-btn');
let cookieForm = document.getElementById('cookie-form');
let modalText = document.getElementById('modal-text');
let declineBtn = document.getElementById('declined-btn');
let containerButtons = document.getElementById('modal-choice-btns');

setTimeout(function(){
    modal.style.display = 'inline';
}, delay);


declineBtn.addEventListener('mouseover', (event) => {
    containerButtons.classList.toggle('reverse');
});


modalClose.addEventListener("click", function(){
    modal.style.display = 'none';
});

cookieForm.addEventListener('submit', function(e){
    e.preventDefault();
    modalText.innerHTML = `<div class="modal-inner-loading">
                            <img src="images/loading.svg" class="loading">
                            <p id="uploadText">
                                Uploading your data to the dark web...
                            </p>
                        </div>`

    const loginFormData = new FormData(cookieForm);
    const userName = loginFormData.get('name');


    setTimeout(function(){
        document.getElementById('uploadText').textContent = 'Making the sale...';
        document.getElementById('modal-inner').innerHTML = `<h2>Thanks you <span class="modal-display-name"> ${userName} </span> ! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
        ` 
        modalClose.disabled = false;
    }, 1500)

    
})




