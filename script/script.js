//
const displayWinnerSection = document.querySelector('#display-winner-section').firstElementChild;
const playerCard = document.querySelector('#player-card').firstElementChild;
const computerCard = document.querySelector('#computer-card').firstElementChild;
const vsSection = document.querySelector('#vs');

function getAttributes1(tagReference, ...atributes) {
    let tag = tagReference;
    let obj = {};
    atributes.forEach(atribute => {
        let value = tag.getAttribute(atribute);
        obj[atribute] = value;
    })
    return obj;
}
function displayPlayerChoice(tag) {
    // get card id and class 
    let cssRulesName = getAttributes1(tag, 'id', 'class');
    //make a clone
    let clone = document.createElement('div');
    clone.setAttribute('class', cssRulesName['class']);
    clone.setAttribute('id', cssRulesName['id']);
    //attach to player choices
    if (playerCard.hasChildNodes() == true) {
        playerCard.innerHTML = '';
        playerCard.appendChild(clone);
    } else {
        playerCard.appendChild(clone);
    }
}

function displayPlayerChoice2(valueOnString = '') {
    function setClone(tag) {
        let atr = getAttributes1(tag, 'id', 'class');
        let clone = document.createElement('div');
        clone.setAttribute('id', atr['id']);
        clone.setAttribute('class', atr['class']);
        playerCard.innerHTML = '';
        playerCard.appendChild(clone);
    }
    switch (valueOnString) {
        case 'paper':
            let paper = document.querySelector('#paper-background-img');
            setClone(paper)
            break;
        case 'rock':
            let rock = document.querySelector('#rock-background-img');
            setClone(rock);
            break;
        case 'sissor':
            let sissor = document.querySelector('#sissor-background-img');
            setClone(sissor);
            break;
    }
}
function displayComputerChoice(computerChoice = '') {
    function setClone(tag) {
        let atr = getAttributes1(tag, 'id', 'class');
        let clone = document.createElement('div');
        clone.setAttribute('id', atr['id']);
        clone.setAttribute('class', atr['class']);
        computerCard.innerHTML = '';
        computerCard.appendChild(clone);
    }
    switch (computerChoice) {
        case 'paper':
            let paper = document.querySelector('#paper-background-img');
            setClone(paper)
            break;
        case 'rock':
            let rock = document.querySelector('#rock-background-img');
            setClone(rock);
            break;
        case 'sissor':
            let sissor = document.querySelector('#sissor-background-img');
            setClone(sissor);
            break;
    }
}
function displayVsSection() {
    vsSection.innerText = '';
    vsSection.innerText = 'VS'
}
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
    displayPlayerChoice2(playerChoiceValue);
    displayVsSection();
    displayComputerChoice(computerChocieValue);
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