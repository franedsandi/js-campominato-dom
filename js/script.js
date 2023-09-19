/* continue from yesterday:
1. give each box a random number not repetitive
2. number 1-16 will be bombs all the others will be safe
3. when player click on any of them, it will show of is a bomb of not
4. each box can only be clicked once
5. if you hit one of the bomb boxes then game over and display score
6. if the player clicks any bomb, you loose; if not you win
7. modify yesterdays reset so the score will be played for each game and do not be acumulative
 */
/********************* DOM Elements ******************************/
const container = document.querySelector('.container');
const messageSecond = document.querySelector('.messagedue');
const messageThird = document.querySelector('.messagetre');
const resetButton = document.getElementById('resetButton');
const difficultySelect = document.getElementById('dificult');

/********************* Game Variables ******************************/
let gameInProgress = false;
let score = 0;
let gameWon = false;
let gameLost = false;

/********************* Start/Reset Button ******************************/
resetButton.addEventListener('click', reset);

/********************* Game Start ******************************/
init();

/********************* Functions ******************************/

/********************
 **** start game ****
 *******************/

function init() {
    gameInProgress = true;
    const selectedValue = difficultySelect.value;

    let boxCount = 100;
    let boxClass = 'width-10';

    if (selectedValue === '2') {
        boxCount = 81;
        boxClass = 'width-9';
    } else if (selectedValue === '3') {
        boxCount = 49;
        boxClass = 'width-7';
    }

    createBoxes(boxCount, boxClass);
}

/********************
 * create all boxes *
 *******************/

function createBoxes(count, className) {
    container.innerHTML = '';
    const uniqueNumbers = generateUniqueRandomNumbers(count);

    for (let i = 0; i < count; i++) {
        const box = createBox(uniqueNumbers[i], className, uniqueNumbers[i]);
        container.append(box);
    }
}

/*******************
 * create each box *
 ******************/

function createBox(index, className, randomNumber) {
    const newBox = document.createElement('div');
    newBox.className = `box ${className}`;

    if (randomNumber >= 1 && randomNumber <= 16) {
        newBox.classList.add('bomb');
    }

    /*******************************
     * each time box clicked / bomb*
     ******************************/

    function clickHandler() {
        if (!gameInProgress || newBox.classList.contains('clicked')) {
            return;
        }

        newBox.classList.toggle('clicked');

        if (newBox.classList.contains('clicked')) {
            if (newBox.classList.contains('bomb')) {
                gameLost = true;
                endGame();
            } else {
                score++;
            }

            clickedBoxes++;
            messageSecond.textContent = `Score: ${score}`;

            if (checkWinCondition()) {
                gameWon = true;
                endGame();
            }
        }

        if (newBox.classList.contains('clicked')) {
            newBox.classList.add('show-bomb');
        } else {
            newBox.classList.remove('show-bomb');
        }

        newBox.removeEventListener('click', clickHandler);
    }
    newBox.addEventListener('click', clickHandler);

    return newBox;
}

/************
 * Game end *
 ***********/

function endGame() {
    gameInProgress = false;

    const bombBoxes = document.querySelectorAll('.bomb');
    bombBoxes.forEach((box) => {
        box.classList.add('clicked', 'show-bomb');
    });

    if (gameLost) {
        messageThird.textContent = "You Lose";
    } else if (gameWon) {
        messageThird.textContent = "You Won";
    }
}

/***************************************
 * Reset (beginning and pressed button) *
 **************************************/

function reset() {
    gameInProgress = false;
    resetButton.innerHTML = 'Start';
    score = 0;
    messageSecond.textContent = '';
    messageThird.textContent = ''; 
    gameWon = false; 
    gameLost = false; 
    init();
}

/*************************************
 * random numbers for bomb ubication *
 ************************************/

function generateUniqueRandomNumbers(count) {
    const uniqueNumbers = [];

    for (let i = 1; i <= count; i++) {
        uniqueNumbers.push(i);
    }
    for (let i = uniqueNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueNumbers[i], uniqueNumbers[j]] = [uniqueNumbers[j], uniqueNumbers[i]];
    }

    return uniqueNumbers;
}

/*************************************
 * Check win condition *
 ************************************/
function checkWinCondition() {
    const nonBombBoxes = container.querySelectorAll('.box:not(.bomb)');
    return [...nonBombBoxes].every((box) => box.classList.contains('clicked'));
}