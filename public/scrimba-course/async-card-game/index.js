let deckId;
let pointsPlayer1 = 0, pointsPlayer2 = 0;
let msgWin;

$(document).ready(function () {
    getDeckAPI();
    $('#button-draw').click(drawCards);
    $('#button-reset').click(resetValues);
});

let getDeckAPI = () => {
    const url = 'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/';
    fetch(url)
        .then(response => response = response.json())
        .then(data => {
            console.log("Deck data is ", data);
            deckId = data.deck_id;
            $('#deck-id').text(`Deck ID is: ${deckId}`)
        })
}

let drawCards = () => {
    let url = `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    fetch(url)
        .then(response => response = response.json())
        .then(data => {
            console.log("Cards are: ", data);
            let cardHolder = [$('#player1 img'), $('#player2 img')]
            let i = 0;
            (data.cards).forEach((element) => {
                $(cardHolder[i]).attr('src', element.image);
                i++;
            });

            if(data.remaining == 0) $('#button-draw').addClass('disabled');
            $('#remaining').text(`Quedan ${data.remaining} cartas ` );
            compareCards(data.cards[0].value, data.cards[1].value);

        })
}

let compareCards = (card1, card2) => {
    let msgWin;
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    let value1 = values.indexOf(card1);
    let value2 = values.indexOf(card2);

    if(value1 > value2){
        pointsPlayer1++;
        msgWin = 'Jugador 1 gana'
    } else if(value1 < value2){
        pointsPlayer2++;
        msgWin = 'Jugador 2 gana'
    } else {
        msgWin = 'Es un empate'
    }

    updateValues(msgWin);
}

let updateValues = msgWin => {
    debugger;
    $('#pl1').text(pointsPlayer1)
    $('#pl2').text(pointsPlayer2)
    $('#msg-win').text(msgWin);
}


let resetValues = () => {
    getDeckAPI();
    pointsPlayer1 = 0, pointsPlayer2 = 0;
    $('#button-draw').removeClass('disabled');
    updateValues('Pulsa para empezar')
    $('#remaining').text(`Quedan 52 cartas ` );
}


/*

* Aces are the card with the highest "score"
 * 
 * In parts:
 * 
 * 1. Create a function that takes 2 card objects as parameters, 
 * `card1` and `card2`. These card objects have a property called
 * `value`, which can be any one of the following strings, in
 * order of rising "score":
 * 
 * "2", "3", "4", "5", "6", "7", "8", "9", 
 * "10", "JACK", "QUEEN", "KING", "ACE"
 * 
 * I.e. "2" is the lowest score and "ACE" is the highest.
 * 
 * The function should determine which of the 2 cards (`card1`
 * or `card2`) has the higher score, or if they have the same score.
 * 
 * Log which card wins (or "It's a tie!" 
 * if they're the same) to the console
 */

