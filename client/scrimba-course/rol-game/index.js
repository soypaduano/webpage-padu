import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]

function attack(){
   wizard.getDiceHtml();
   orc.getDiceHtml();

   wizard.takeDamage(orc.currentDiceScore);
   orc.takeDamage(wizard.currentDiceScore);

   wizard.health <= 0 || orc.health <= 0 ? endGame() : console.log("Game continue"); //Ternary Operator. 

   render();
}

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = orc.getCharacterHtml();
}

function endGame(){
   let endMessage, endEmoji;
   endEmoji = '🔮';
   if(orc.health <= 0 && wizard.health > 0){
      endMessage = "Orco pierde"
   } else if(orc.health > 0 && wizard.health <= 0){
      endMessage = "Wizard pierde"
   } else if(wizard.health <= 0 && orc.health <= 0){
      endMessage = "Ambos pierden"
   }
   $('#game-section').html(`<div class="end-game">
      <h2>Game Over</h2>
      <h3>${endMessage}</h3>
      <p class="end-emoji">${endEmoji}</p>
      </div>`)
}

document.getElementById("attack-button").addEventListener('click', attack)

const wizard = new Character(characterData.hero)
const orc = new Character(characterData.monster)
render()
getNewMonster();


function getNewMonster(){
   const nextMonsterData = characterData[monstersArray.shift()]
}

/*
Challenge
1. Create a function called getNewMonster.
2. Write logic inside the function that takes the first 
monster from monstersArray and extracts that monster's 
data from characterData.
3. Save that data to a new const called nextMonsterData.
**hint.md for help!!**
*/