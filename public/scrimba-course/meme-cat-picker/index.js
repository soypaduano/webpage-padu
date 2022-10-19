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
}


function addListenerToRadioButtons(){
    emotionRatios[0].addEventListener('change', function(e){
        $('.radio.highlight').removeClass('highlight');
        $('#' + e.target.id + '').addClass('selected').parent().addClass('highlight');
        
    })
}

function addListenerToButton(){
    $('#get-image-btn').click(function(){
        renderCat();
    })
}

function getMatchingCatsArray(){
    if($('input[type="radio"]:checked').val()){
        let emotionCat = $('input[type="radio"]:checked').val();
        let gifOnly = $('#gifs-only-option').prop('checked');
        let emotionsFound = catsData.filter(function(cat){
            return (cat.emotionTags.includes(emotionCat) && cat.isGif === gifOnly);
        });

        return emotionsFound;
    }   
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray();   
    if(catsArray.length === 1){
        return catsArray[0];
    } else {
        var randomnumber = Math.floor(Math.random() * ((catsArray.length - 1) - 0 + 1)) + 0;
        return catsArray[randomnumber];
    }
}

function renderCat(){
    let catSelected = getSingleCatObject();
    $('#meme-modal-inner').html( `<img 
                                    class="cat-img" 
                                    src="scrimba-course/meme-cat-picker/images/${catSelected.image}"
                                    alt="CAT ALT TEXT"
                                    >`)

    $('#meme-modal').css('display', 'flex');

    $('#meme-modal-close-btn').click(function(){
        $('#meme-modal').css('display', 'none');
    })
}
 




renderEmotionsRadios(catsData);

