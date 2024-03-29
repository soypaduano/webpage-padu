import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    wizard.getDiceHtml()
    monster.getDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()
    
        if(wizard.dead || monster.dead){
           if(wizard.dead){
            setTimeout(() =>{
               $('#attack-button').addClass("disabled");
               endGame();
            }, 1500); 
           } else {
              let newMonster = getNewMonster();
              if(newMonster.health){
                 monster = newMonster;
                 $('#attack-button').addClass("disabled");
                 setTimeout(() =>{
                  render();
                 }, 2500);
              } else {
               setTimeout(() =>{
                  $('#attack-button').addClass("disabled");
                  endGame();
               }, 1500); 
              }
           }
            
        }      
}

function endGame() {
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The Orc is Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
   $('#attack-button').removeClass("disabled");
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()



/*
Challenge
1. Disable the user's ability to attack when a monster dies.
2. Reneable the user's ability to attack when a new monster
loads.
3. When the game is over, disable the user's ability to attack.
**hint.md for help!!**
*/

