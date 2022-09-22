// picking unique random numbers in a the range [1, 10000] using Fisher–Yates shuffle

import "../styles.css"

// UI elements
const displayButton = document.getElementById("display-ten-nums")
const octagonContainer = document.querySelector("#octagon-container")

// functions
function createSortedArrayOfNumbers(start, end) {
    let numbersArray = []

    for (let i=start; i <= end; i++) {
        numbersArray.push(i)
    }

    return numbersArray
}

function shuffle(array) {
    let arrayLength = array.length
    let temp
    let swapIndex

    while (arrayLength) {
      swapIndex = Math.floor(Math.random() * arrayLength--);

      temp = array[arrayLength];
      array[arrayLength] = array[swapIndex];
      array[swapIndex] = temp
    }

    return array
}

function addRandomNumbersToUI(sortedArray) {
    let randomNumbers = shuffle(sortedArray)

    octagonContainer.insertAdjacentHTML('afterbegin', randomNumbers.map(number => `<div class="octagon"><p class="numbers">${number}</p></div>`))
}


const sortedNumbers = createSortedArrayOfNumbers(1, 10000)

displayButton.addEventListener('click', () => {
    const randomNumberElementInUI = document.querySelector('.octagon')

    if (document.body.contains(randomNumberElementInUI)) {
        octagonContainer.innerHTML = ''
        addRandomNumbersToUI(sortedNumbers)
    } else {
        addRandomNumbersToUI(sortedNumbers)
    }
})