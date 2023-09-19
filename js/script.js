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

// 1.
const container = document.querySelector('.container');
const outcontainer = document.querySelector('.outcontainer');
const message = document.querySelector('.message');
// 7.
const resetButton = document.getElementById('resetButton');
const difficultySelect = document.getElementById('dificult');
// 7.
resetButton.addEventListener('click', reset);
init();

function init() {
    const selectedValue = difficultySelect.value;
    // 4.
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
// 3.
function createBoxes(count, className) {
    // 6.
    container.innerHTML = '';
    for (let i = 1; i <= count; i++) {
        const box = createBox(i, className);
        container.append(box);
    }
}

function createBox(index, className) {
    const newBox = document.createElement('div');
    newBox.className = `box ${className}`;
    newBox.innerHTML = '';
    // 5.
    newBox.addEventListener('click', function () {
        this.classList.toggle('clicked');
        // 8.
        if (this.classList.contains('clicked')) {
            this.innerHTML = `<span>${index}</span>`;
        // 9.
        } else {
            this.innerHTML = '';
        }
    });
    
    return newBox;
}
// 2.
function reset() {
    outcontainer.classList.remove('hide');
    message.classList.add('hide');
    init();
    document.resetButton.innerHTML = 'Reset';
}




