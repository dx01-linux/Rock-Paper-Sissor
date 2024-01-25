//
const displayWinnerSection = document.querySelector('#display-winner-section').firstElementChild;
const playerCard = document.querySelector('#player-card').firstElementChild;
const computerCard = document.querySelector('#computer-card').firstElementChild;
const vsSection = document.querySelector('#vs');

//get atributes from a tag 
function getAttributes1(tagReference, ...atributes) {
    let tag = tagReference;
    let obj = {};
    atributes.forEach(atribute => {
        let value = tag.getAttribute(atribute);
        obj[atribute] = value;
    })
    return obj;
}

//display cloneSiblingTag on parent tag
function displayChoice(choiceValue = '' ,  parentTag) {
    
    function setClone(cloneSibling) {
        let atr = getAttributes1(cloneSibling, 'id', 'class');
        let clone = document.createElement('div');
        clone.setAttribute('id', atr['id']);
        clone.setAttribute('class', atr['class']);
        return clone ;
    }
    switch (choiceValue) {
        case 'paper':
            let paper = document.querySelector('#paper-background-img');
            parentTag.innerText = '';
            parentTag.appendChild(setClone(paper));
            break;
        case 'rock':
            let rock = document.querySelector('#rock-background-img');
            parentTag.innerText = '';
            parentTag.appendChild(setClone(rock));
            break;
        case 'sissor':
            let sissor = document.querySelector('#sissor-background-img');
            parentTag.innerText = '';
            parentTag.appendChild(setClone(sissor));
            break;
    }
}
function displayVsSection() {
    vsSection.innerText = '';
    vsSection.innerText = 'VS'
}
//return a string ['sissor', 'paper', 'rock']
function computerChoice() {
    let computerChoices = ['sissor', 'paper', 'rock'];
    let randNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return computerChoices[randNumber(0, 2)];
}

function getWinner(playerChoice, computerChoice) {
    let plyChoice = playerChoice;
    let comChoice = computerChoice;
    let playerWon = false;
    let draw = false;

    switch (plyChoice) {
        case 'paper':
            switch (comChoice) {
                case 'paper':
                    draw = true;
                    break;
                case 'rock':
                    playerWon = true;
                    break;
                case 'sissor':
                    playerWon = false;
                    break;
            }
            break;
        case 'sissor':
            switch (comChoice) {
                case 'sissor':
                    draw = true
                    break;
                case 'paper':
                    playerWon = true;
                    break;
                case 'rock':
                    playerWon = false;
                    break;
            }break;
        case 'rock':
            switch (comChoice) {
                case 'sissor':
                    playerWon = true;
                    break;
                case 'rock':
                    draw = true;
                    break;
                case 'paper':
                    playerWon = false;
                    break;
            }
            break;

    }

    if (draw == false) {
        if (playerWon == false) {
            displayWinnerSection.innerText = '';
            displayWinnerSection.innerText = 'Computer Won';
        }
        else {
            displayWinnerSection.innerText = '';
            displayWinnerSection.innerText = 'Player Won';
        }

    } else {
        displayWinnerSection.innerText = '';
        displayWinnerSection.innerText = 'Draw';
    }
}

function playRound(value) {
    let playerChoiceValue = value;
    let computerChocieValue = computerChoice();
    getWinner(playerChoiceValue, computerChocieValue);
    displayChoice(playerChoiceValue , playerCard); //display player card selection 
    displayVsSection();
    displayChoice(computerChocieValue , computerCard);//display computer card selection :
}


const playerChoicesCards = document.querySelectorAll('.card');
playerChoicesCards.forEach(card => {
    //click on card with player selection for satarting
    card.addEventListener('click', e => {
        /*playRound():
                get winner
                    get player choice 
                    get randowm computer chocie 
                    compare player vs computer
                    display header with who won: 
                        select empty header
                        display result of match
                display player selection:
                    displayPlayerSelection()
                display vs 
                    vsSection.text = 'VS
                display computer selection
                    *display card in base on selection        
        */
        switch (card.getAttribute('id')) {
            case 'rock-background-img':
                playRound('rock');
                break;
            case 'paper-background-img':
                playRound('paper');
                break;
            case 'sissor-background-img':
                playRound('sissor');
                break;
        }
    });
});