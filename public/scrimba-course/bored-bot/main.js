/**
Challenge: 

1. Fetch a random activity from the Bored API
url: https://apis.scrimba.com/bored/api/activity

2. Display the text of the activity in the browser
*/


let backgrounds = ['opa', 'midnightCity', 'mystic', 'shroom', 'moss', 'bora']


function getActivityBoredApi() {
    fetch('https://apis.scrimba.com/bored/api/activity').then(response => response.json()).then(data => {
        $('#activity').text(data.activity);
        const randomElement = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        $('.body-container').removeClass().addClass('body-container');
        $('.body-container').addClass(randomElement);
    })
};


function getJSONPlaceholder() {
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            let arr = data.slice(0, 5);
            console.log(arr);
            arr = arr.map(element => `<div class="msg"> <h6> ${element.title} </h6>
                                    <p> ${element.body} </p> </div>`)
            $('#json-msg').html(arr);
        });
}

//getJSONPlaceholder();
//getBlogpost(2);
getWeather();

function postObject(e) {
    console.log(e);
    e.preventDefault();
    const obj = {
        'title': $('#post-title').val(),
        'body': $('#post-body').val()
    }

    fetch('https://apis.scrimba.com/jsonplaceholder/todos', {
        method: 'POST',
        body: JSON.stringify(
            {
                title: "hola, soy padu",
                completed: true
            }),
        headers: {
            'Content-Type': 'applicationson'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log("Went... good?")
            console.log(data);
            $('#post-title').val('')
            $('#post-body').val('')
        });

}


function getBlogpost(id){
    fetch(`https://apis.scrimba.com/jsonplaceholder/posts/${id}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
    });
}


function getWeather(){
    const lat = 40.416775;
    const lon = -3.703790;
    let url = `https://apis.scrimba.com/openweathermap/data/2.5//weather?lat=${lat}&lon=${lon}&units=metric`;
    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < 100; i++){
            console.log(data);
        }
        
    });

}


