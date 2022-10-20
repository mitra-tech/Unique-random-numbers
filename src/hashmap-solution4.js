// picking unique random numbers in a the range [1, 10000] using hash map

import "./styles.css";

// UI elements
const displayButton = document.getElementById("display-ten-nums");
const octagonContainer = document.querySelector("#octagon-container");

// functions
function generateRandomInteger(number) {
  return Math.floor(Math.random() * number) + 1;
}

function getMapValueOrElse(map, key, fallback) {
  return map.has(key) ? map.get(key) : fallback;
}

let getMapKeyOrValue = (map, key) => getMapValueOrElse(map, key, key);

function storeAllRandomNumbers(generator, rangeMaxValue) {
  let randomNumbers = [];
  for (let i = 1; i <= rangeMaxValue; i++) {
    randomNumbers.push(generator.next().value);
  }

  return randomNumbers;
}

function addRandomNumbersToUI(generator, rangeMaxValue) {
  let randomNumbers = storeAllRandomNumbers(generator, rangeMaxValue);

  octagonContainer.insertAdjacentHTML(
    "afterbegin",
    randomNumbers.map(
      (number) => `<div class="octagon"><p class="numbers">${number}</p></div>`
    )
  );
}

function* shuffle(rangeMaxValue, uniqueNumberQuantity) {
  // generator function
  let swapMap = new Map();

  let swapMapValueOrKey = getMapKeyOrValue.bind(null, swapMap);

  let start = rangeMaxValue;
  let end = rangeMaxValue - uniqueNumberQuantity;

  for (let pointerIndex = start; pointerIndex > end; pointerIndex--) {
    let randomIndex = generateRandomInteger(pointerIndex);

    yield swapMapValueOrKey(randomIndex);

    swapMap.set(randomIndex, swapMapValueOrKey(pointerIndex));

    if (swapMap.get(pointerIndex)) {
      swapMap.delete(pointerIndex);
    }
  }
}

// constants
const rangeMaxValue = 10000;
const uniqueNumberQuantity = 10000; // number of unique numbers in the range

// display button - click event listener
displayButton.addEventListener("click", () => {
  const randomNumberElementInUI = document.querySelector(".octagon");

  if (document.body.contains(randomNumberElementInUI)) {
    const randomNumberGenerator = shuffle(rangeMaxValue, uniqueNumberQuantity);
    octagonContainer.innerHTML = "";
    addRandomNumbersToUI(randomNumberGenerator, rangeMaxValue);
  } else {
    const randomNumberGenerator = shuffle(rangeMaxValue, uniqueNumberQuantity);
    addRandomNumbersToUI(randomNumberGenerator, rangeMaxValue);
  }
});

// filtered numbers

// const filterButton = document.getElementById("filter-button");
// filterButton.addEventListener("click", filterHandler);

// const arr = [];
// function filterHandler(e) {
//   e.preventDefault();
//   const firstInputValue = document.getElementById("first-number").value;
//   const secondInputValue = document.getElementById("second-number").value;
//   console.log(firstInputValue);
// }

// An alternate way for the last solution
import "./styles.css"

// UI elements
const displayButton = document.getElementById("display-ten-nums")
const octagonContainer = document.querySelector("#octagon-container")

let randomNumbers = []

function generateRandomInteger(number) {
    return (Math.floor(Math.random() * number) + 1)
}

function getMapValueOrKey(map, key){
    return map.has(key) ? map.get(key) : key
}

function shuffle(rangeMax, uniqueNumber) {
    let swapMap = new Map()

    let start = rangeMax
    let end = rangeMax - uniqueNumber

    for( let pointerIndex = start; pointerIndex > end ; pointerIndex--) {
      let randomIndex = generateRandomInteger(pointerIndex)

      randomNumbers.push(getMapValueOrKey(swapMap, randomIndex))

      swapMap.set(randomIndex, getMapValueOrKey(swapMap, pointerIndex))

      if(swapMap.get(pointerIndex)) {
        // swapMap.delete(pointerIndex)
      }
    }
    return randomNumbers
}

function addRandomNumbersToUI(generatedRandomNumbers) {
    octagonContainer.insertAdjacentHTML('afterbegin', generatedRandomNumbers.map(number => `<div class="octagon"><p class="numbers">${number}</p></div>`))
}

const rangeMaxValue = 10
const uniqueNumberQuantity = 10

displayButton.addEventListener('click', () => {
    const randomNumberElementInUI = document.querySelector('.octagon')

    if (document.body.contains(randomNumberElementInUI)) {
      const generatedRandomNumbers = shuffle(rangeMaxValue, uniqueNumberQuantity)
      octagonContainer.innerHTML = ''
      addRandomNumbersToUI(generatedRandomNumbers)
      randomNumbers = []
    } else {
     const generatedRandomNumbers = shuffle(rangeMaxValue, uniqueNumberQuantity)
     addRandomNumbersToUI(generatedRandomNumbers)
     randomNumbers = []
    }
})
