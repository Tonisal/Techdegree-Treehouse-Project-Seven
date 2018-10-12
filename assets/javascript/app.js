let missed = 0;
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const phrase = document.querySelector('#phrase ul');
const button = document.querySelectorAll('#qwerty button');
const phrases = ['chin', 'ostracize', 'retired', 'old', 'cage'];
let charsArray;
let title = document.querySelector('.title');
let list = '';


for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function (event) {
        event.target.classList.add('chosen');
        event.target.setAttribute("disabled", "true");
        let letterFound = checkLetter(event);


        if (letterFound === undefined) {
            missed = missed + 1;
            let hearts = document.querySelectorAll('img[src="assets/images/liveHeart.png"]');
            console.log(hearts.length);
            if (hearts.length) {
                let heartToRemove = hearts[hearts.length - 1];
                heartToRemove.setAttribute("src", "assets/images/lostHeart.png");
            }
        }
        checkForGameEnd();
    });
}

startButton.addEventListener('click', function () {
    console.log('click');
    resetGame();
    charsArray = getRandomPhraseAsArray(phrases);
    overlay.classList.add('u-display-none');
    addPhraseToDisplay(charsArray);
    list = document.querySelectorAll('.letter');
});

function getRandomPhraseAsArray(phrases) {
    let positionInString = Math.floor((Math.random() * phrases.length));
    let phraseToGuess = phrases[positionInString];
    let chars = phraseToGuess.split('');
    return chars;
}

function addPhraseToDisplay(charsArray) {
    for (let i = 0; i < charsArray.length; i++) {
        let listItem = document.createElement("LI");
        phrase.appendChild(listItem);
        listItem.textContent = charsArray[i];
        if (charsArray[i] !== ' ') {
            listItem.classList.add('letter');
        }
    }
}

function checkLetter(event) {
    let letterToCheck = event.target.textContent;

    for (let i = 0; i < charsArray.length; i++) {
        if (letterToCheck === charsArray[i]) {
            for (let ii = 0; ii < list.length; ii++) {
                if (letterToCheck === list[ii].textContent) {
                    list[ii].classList.add('show');
                    return letterToCheck;
                }
            }
        }
    }
}

function checkForGameEnd() {
    if (missed >= 5) {
        title.textContent = 'You lost :( Want to play again?';
        startButton.textContent = 'Play again';
        overlay.classList.remove('u-display-none', 'start');
        overlay.classList.add('lose');

    } else {

        let letters = document.querySelectorAll('.letter');
        let show = document.querySelectorAll('.show');

        if (letters.length === show.length) {
            startButton.textContent = 'Play again';
            title.textContent = 'You won :) Want to play again?';
            overlay.classList.remove('u-display-none', 'start');
            overlay.classList.add('win');
        }
    }
}

function resetGame() {

    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const chosen = document.querySelectorAll('.chosen');
    const hearts = document.querySelectorAll('img[src="assets/images/lostHeart.png"]');

    if (missed > 0 || show.length) {
        missed = 0;

        chosen.forEach(function (element) {
            element.classList.remove('chosen');
            element.removeAttribute('disabled');
        });

        letter.forEach(function (element) {
            phrase.removeChild(element);
        });

        hearts.forEach(function (element) {
            element.setAttribute("src", "assets/images/liveHeart.png");
        });
    }
}