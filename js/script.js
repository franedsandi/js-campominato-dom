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


const container = document.querySelector('.container');
const outcontainer = document.querySelector('.outcontainer');
const message = document.querySelector('.message');

const resetButton = document.getElementById('resetButton');
const difficultySelect = document.getElementById('dificult');

resetButton.addEventListener('click', reset);
init();

function init() {
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

function createBoxes(count, className) {
    container.innerHTML = '';
    const uniqueNumbers = generateUniqueRandomNumbers(count);

    for (let i = 0; i < count; i++) {
        const box = createBox(uniqueNumbers[i], className, uniqueNumbers[i]);
        container.append(box);
    }
}

function createBox(index, className, randomNumber) {
    const newBox = document.createElement('div');
    newBox.className = `box ${className}`;
    newBox.innerHTML = '';

    function clickHandler() {
        newBox.classList.toggle('clicked');

        if (newBox.classList.contains('clicked')) {
            newBox.innerHTML = `<span>${randomNumber}</span>`;
            newBox.removeEventListener('click', clickHandler); // Elimina el event listener después del clic
        } else {
            newBox.innerHTML = '';
        }
    }

    newBox.addEventListener('click', clickHandler);

    return newBox;
}

function reset() {
    outcontainer.classList.remove('hide');
    message.classList.add('hide');
    init();
    document.resetButton.innerHTML = 'Reset';
}

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




