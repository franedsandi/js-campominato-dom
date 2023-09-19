/*  make a grid 10 * 10 and then when click an element add the class clicked
1. safe the container
2. reset
3. cicle counted boxes
4. each cicle creates a box, repeat the cicle (counted) times with a function
5. to each box add the toggle function when clicked or unclicked
6. add the boxes to the container
7. create a button to reset the container
8. add the index number to each box
9. display the index number of each box when clicked
 */
/********************* DOM Elements ******************************/
const container = document.querySelector('.container');
const outcontainer = document.querySelector('.outcontainer');
const message = document.querySelector('.message');
const messageSecond = document.querySelector('.messagedue');
const messageThird = document.querySelector('.messagetre');
const resetButton = document.getElementById('resetButton');
const difficultySelect = document.getElementById('dificult');

/********************* Game Variables ******************************/
let gameStarted = false;
let gameInProgress = false;
let score = 0;
let clickedBoxes = 0;
let gameWon = false;
let gameLost = false;

/********************* Start/Reset Button ******************************/
resetButton.addEventListener('click', reset);

/********************* Game Start ******************************/
init();

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
/********************* Funtions ******************************/
/**************************
 **** create all boxes ****
 *************************/
function createBoxes(count, className) {
    container.innerHTML = '';
    const uniqueNumbers = generateUniqueRandomNumbers(count);

    for (let i = 0; i < count; i++) {
        const box = createBox(uniqueNumbers[i], className, uniqueNumbers[i]);
        container.append(box);
    }
}
/*************************
 **** create each box ****
 *************************/
function createBox(index, className, randomNumber) {
    const newBox = document.createElement('div');
    newBox.className = `box ${className}`;

    if (randomNumber >= 1 && randomNumber <= 16) {
        newBox.classList.add('bomb');
    }
    /*************************
     * each time box clicked *
     *************************/
    function clickHandler() {
        if (!gameInProgress) {
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
    
            if (clickedBoxes === (container.children.length - document.querySelectorAll('.bomb.clicked').length)) {
                gameWon = true; 
                endGame();
            }
        }
    
        if (newBox.classList.contains('clicked')) {
            newBox.classList.add('show-bomb');
        } else {
            newBox.classList.remove('show-bomb');
        }
    }
    newBox.addEventListener('click', clickHandler);

    return newBox;
}
/*************************
 ******* Game end ********
 *************************/
function endGame() {
    gameInProgress = false;

    const bombBoxes = document.querySelectorAll('.bomb');
    bombBoxes.forEach((box) => {
        box.classList.add('clicked', 'show-bomb');
    });

    if (gameLost) {
        messageThird.textContent = "You Lose";
    } else if (!gameLost && !gameWon) {
        messageThird.textContent = "You Won";
    }
}
/***************************************
 * Reset (begining and pressed button) *
 **************************************/
function reset() {
    outcontainer.classList.remove('hide');
    message.classList.add('hide');
    gameStarted = false;
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