import "../styles.css"

// UI elements
const displayButton = document.getElementById("display-ten-nums")
const octagonContainer = document.querySelector("#octagon-container")

// constants
const rangeMin = 1
const rangeMax = 10000

// functions
function getRandomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}

function createSortedArrayOfNumbers(start, end) {
    let numbersArray = []
    for (let i=start; i <= end; i++) {
        numbersArray.push(i)
    }
    return numbersArray
}

function generateRandomNumbers() {
    let numbersArray = createSortedArrayOfNumbers(rangeMin, rangeMax)

    let randomNumbers = []

    while (numbersArray.length !== 0) {
        let randomIndex = getRandomNumber(0, numbersArray.length - 1)
        let randomNumber = numbersArray[randomIndex]
        randomNumbers.push(randomNumber)
        numbersArray.splice(randomIndex, 1)
    }

    return randomNumbers
}

function addRandomNumbersToUI(sortedArray) {
    let randomNumbers = generateRandomNumbers()

    octagonContainer.insertAdjacentHTML('afterbegin', randomNumbers.map(number => `<div class="octagon"><p class="numbers">${number}</p></div>`))
}

//event listener
displayButton.addEventListener('click', () => {
    const randomNumberElementInUI = document.querySelector('.octagon')

    if (document.body.contains(randomNumberElementInUI)) {
        octagonContainer.innerHTML = ''
        addRandomNumbersToUI(sortedNumbers)
    } else {
        addRandomNumbersToUI(sortedNumbers)
    }
})