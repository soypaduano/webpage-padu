const emotionRatios = $('#emotion-radios');
import { catsData } from "./catsData.js";


$(document).ready(function(){
    addListenerToRadioButtons();
    addListenerToButton();
})

function getEmotionsArrayNew(cats) {
    const catEmotions = [];
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!catEmotions.includes(emotion)){
                catEmotions.push(emotion)
            }
            
        }
    }
    return catEmotions;
}

function renderEmotionsRadios(cats) {
    let emotionString = '';
    let emotionsArray = [];
    const emotions = getEmotionsArrayNew(cats);
    for (let emotion of emotions) {
        if (!emotionsArray.includes(emotion)) {
            emotionString = `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >`
            $(emotionRatios).append(emotionString);
        }
    }

    console.log(emotions);
    console.log(emotionsArray);
}


function addListenerToRadioButtons(){
    emotionRatios[0].addEventListener('change', function(e){
        $('.radio.highlight').removeClass('highlight');
        $('#' + e.target.id + '').addClass('selected').parent().addClass('highlight');
        
    })
}

function addListenerToButton(){
    $('#get-image-btn').click(function(){
        getMatchingCatsArray();
    })
}

renderEmotionsRadios(catsData);




function getMatchingCatsArray(){
    if($('input[type="radio"]:checked').val()){
        console.log($('input[type="radio"]:checked').val());
        console.log($('#gifs-only-option').prop('checked'));
    }
    
}



/*
Challenge:
1. Take control of the gifs only option checkbox.
2. Set up a const in getMatchingCatsArray to store 
   a boolean which will be set to true if the 
   "gifs only" option is checked and false if it's
   not. (Think what a good name for this const would 
   be.)
3. Log it out to check it's working.
*/






