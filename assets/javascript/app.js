var missed = 0;
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const phrase = document.querySelector('#phrase ul');
const button = document.querySelectorAll('#qwerty button');
const phrases = ['chin', 'presidential', 'royalty', 'old', 'cage'];
const charsArray = getRandomPhraseAsArray(phrases);
console.log(charsArray);
var list = '';

//Start the game
startButton.addEventListener('click', function () {
    overlay.classList.add('u-display-none');
    addPhraseToDisplay(charsArray);
    list = document.querySelectorAll('.letter');
    console.log(list);

    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', function (event) {
            event.target.classList.add('chosen');
            event.target.setAttribute("disabled", "true");
            var letterFound = checkLetter(event);
            console.log('letterFound: ' + letterFound);

            if (letterFound === undefined) {
                missed = missed + 1;
                console.log('missed: ' + missed);
                const scoreboard = document.querySelector('#scoreboard ol');
                let heartToDelete = document.querySelector('#scoreboard ol li:last-child');
                if (heartToDelete) {
                    scoreboard.removeChild(heartToDelete);
                }
            }
            CheckForGameEnd();
        });
    }
});

function getRandomPhraseAsArray(phrases) {
    var positionInString = Math.floor((Math.random() * phrases.length));
    var phraseToGuess = phrases[positionInString];
    var chars = phraseToGuess.split('');
    return chars;
}

function addPhraseToDisplay(charsArray) {
    for (var i = 0; i < charsArray.length; i++) {
        var listItem = document.createElement("LI");
        phrase.appendChild(listItem);
        listItem.textContent = charsArray[i];
        if (charsArray[i] !== ' ') {
            listItem.classList.add('letter');
        }
    }
}

function checkLetter(event) {
    var letterToCheck = event.target.textContent;

    for (var i = 0; i < charsArray.length; i++) {
        if (letterToCheck === charsArray[i]) {
            for (var ii = 0; ii < list.length; ii++) {
                if (letterToCheck === list[ii].textContent) {
                    list[ii].classList.add('show');
                    return letterToCheck;
                }
            }
        }
    }
}

function CheckForGameEnd() {
    if (missed > 5) {
        overlay.classList.remove('u-display-none');
    }
}