let winSquare = []
let arrOfSquare = []

let indexWinSquare = 0
const colors = [
    'green', 'blue', 'red', 'yellow', 'orange'
]

let oneSide = 3
const numberOfSquares = 12
const width = 25
const numberOfTries = 4
let attemptsLeft = 0
let maxSquares = Math.pow(oneSide, 2)

function init() {
    winSquare = []
    arrOfSquare = []
    for (let i = 0; i < maxSquares; i++) {
        winSquare.push(getRandomElement(colors))
    }
    for (let i = 0; i < numberOfSquares; i++) {
        let buffer = []
        for (let i = 0; i < maxSquares; i++) {
            buffer.push(getRandomElement(colors))
        }
        arrOfSquare.push(buffer)
    }

    indexWinSquare = Math.floor(Math.random() * arrOfSquare.length)
    arrOfSquare[indexWinSquare] = winSquare

    const top_row = document.querySelector('.top_row')
    const main_square = top_row.querySelector('.main_square')
    main_square.style.cursor = 'auto'
    main_square.style.flex = `0 0 ${oneSide * width}px`
    main_square.style['grid-template-columns'] = `repeat(${oneSide}, 1fr)`

    const listOfSquare = main_square.querySelectorAll('.mini_square');
    for (let i = 0; i < listOfSquare.length; i++) {
        listOfSquare[i].remove()
    }
    for (let i = 0; i < winSquare.length; i++) {
        const miniSquare = document.createElement('div')
        miniSquare.className = 'mini_square'
        miniSquare.style.background = winSquare[i]
        miniSquare.style.width = width + 'px'
        miniSquare.style.height = width + 'px'
        main_square.appendChild(miniSquare)
    }
    drawNumbers()
    drawProgressBar()
    drawAllSquare()
    mouse()
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function drawNumbers() {
    const left_number = document.querySelector('.left_number h1')
    left_number.innerHTML = (oneSide - 3).toString();

    const right_number = document.querySelector('.right_number h1')
    right_number.innerHTML = attemptsLeft.toString();
}

function drawProgressBar() {
    const green_line = document.querySelector('.green_line')
    const red_line = document.querySelector('.red_line')
    const party = 100 / numberOfTries;
    green_line.style.width = `${100 - party * attemptsLeft}%`
    red_line.style.width = `${party * attemptsLeft}%`
}

function drawAllSquare() {
    const bottom_row = document.querySelector('.bottom_row')
    const arrayOfSquare = bottom_row.querySelectorAll('.main_square')
    for (let i = 0; i < arrayOfSquare.length; i++) {
        arrayOfSquare[i].remove()
    }

    for (let i = 0; i < arrOfSquare.length; i++) {
        const mainSquare = document.createElement('div')
        mainSquare.className = 'main_square'
        mainSquare.index = i
        mainSquare.style.flex = `0 0 ${oneSide * width}px`
        mainSquare.style['grid-template-columns'] = `repeat(${oneSide}, 1fr)`
        const square = arrOfSquare[i]
        for (let j = 0; j < square.length; j++) {
            const miniSquare = document.createElement('div')
            miniSquare.className = 'mini_square'
            miniSquare.style.background = square[j]
            miniSquare.style.width = width + 'px'
            miniSquare.style.height = width + 'px'
            mainSquare.appendChild(miniSquare)
        }
        bottom_row.appendChild(mainSquare)
    }
}

function mouse() {
    const bottom_row = document.querySelector('.bottom_row')
    bottom_row.onmouseup = (e) => {
        if (e.target.className === 'mini_square') {
            if (e.target.parentElement.index === indexWinSquare) {
                winAnimation()
            } else {
                lose()
            }
        }
    }
}

function winAnimation() {
    const bottom_row = document.querySelector('.bottom_row')
    bottom_row.onmouseup = null;
    const arrayOfSquare = bottom_row.querySelectorAll('.main_square')
    arrayOfSquare[arrayOfSquare.length - 1].addEventListener('animationend', () => {
        increase()
        init()
    });
    for (let i = 0; i < arrayOfSquare.length; i++) {
        arrayOfSquare[i].style.animation = 'rotate-animation 1s linear forwards'
    }

}

function lose() {
    const bottom_row = document.querySelector('.bottom_row')
    bottom_row.onmouseup = null;
    if (attemptsLeft === numberOfTries - 1) {
        oneSide = 3
        maxSquares = Math.pow(oneSide, 2)
        attemptsLeft = 0
    } else {
        attemptsLeft++;
    }
    init()
}

function increase() {
    oneSide++;
    maxSquares = Math.pow(oneSide, 2)
}

init()