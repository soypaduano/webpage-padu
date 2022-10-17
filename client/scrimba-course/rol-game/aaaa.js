let arr = randomNumbers.fill(Math.ceil((Math.random()) * 6))

const hero = {
    elementId: "hero", 
    name: "Wizard", 
    avatar: "images/wizard.png", 
    health: 60, 
    dices: 3,
 }
 
 const monster = {
    elementId: "monster", 
    name: "Orc", 
    avatar: "images/orc.png", 
    health: 10, 
    dices: 1
 }
 
 function getDiceRollArray(length){
    let randomNumbers = new Array(length)
    return randomNumbers.fill(0)
 }
 
 function getDiceHtml(diceRoll){
    getDiceRollArray(diceRoll).map(function(diceNumber){
       return `<div class="dice">${}</div>`;
    }).join('')
 
    /*return getDiceRollArray().map(function(diceNumber){
       
    }).join(' ')*/
 }
 
 function renderCharacter(data) {
    let {elementId, name, avatar, health, dices} = data;
 
    document.getElementById(elementId).innerHTML =
        `<div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            <div class="dice-container">
                ${getDiceHtml(dices)}
            </div>
        </div>`
 }
 
 renderCharacter(hero);
 renderCharacter(monster);
 
 
 /* Challenge: 
 1. Instead of the for loop, use an Array constructor to 
    create a new array which is diceCount length.
 2. Fill the new array with zeros as its initial state.
 3. Map over the new array directly (no need to declare a 
    new variable) and return a random number from 1-6 in 
    each element.
 4. Delete all unnecessary code.
 */  