# Generate K unique random number in a specific range

## Language used
JavaScript

## How to run
```bash
npm install
npm start
```

## Problem
Write a program that generate a list of 10,000 numbers in random order each time it is run. Each number in the list must be unique & be between 1 and 10,000 (inclusive).

## Assumptions

```python
N = specified range = max - min
K = number of unique random numbers in the specified range
```

## Solutions to the problem
I could found four solutions for this problem.

## Solution 1
* create an array to store the generated random numbers
* repeat the following until we have selected k unique numbers from the specified range:
   * Select a random value from the range
   * check if it has been previously selected
   * if it is 'new', then add it to the container

This solution will produce random values, in a random order, and with good random characteristics but The problem is with performance. This solution seems not efficient at all as the amount of needed numbers increases.

There are 2 concerns with this solution:
1. Collision: this happens when the random value was previously selected so if N is very large but K is small, the probability of collision will be reduced so this solution is good If range is huge and k is small but that is not the case with our problem as here even though we have a N but we do not have a small K (our K is so large)

2. Array performance: this is the biggest concern. We need to scan all previously-selected random numbers in the array to determine whether a value was previously selected or not. As the K gets bigger & bigger, the time it takes to perform this operation will increase at an quadratic rate (Bog O notation of O(n^2))

The performance problem will become critical much sooner than the random-collision problem.


## Solution 2 (picking only remaining elements)
The second solution I came up with is to keep all the possible numbers in a an array and the random-number generator will give me the position to remove a number from the array. Thus I will never have a duplicate number even if the generator will create the same number twice as the number that was there the first time in that position will be removed from the array. The following is the main method of this solution:

```python
function generateRandomNumbers() {
    let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // min=1 & max=10

    let generatedRandomNumbers = []

    while (numbersArray.length !== 0) {
        let randomIndex = getRandomNumber(0, numbersArray.length - 1)
        let randomNumber = numbersArray[randomIndex]
        generatedRandomNumbers.push(randomNumber)  // o(1)
        numbersArray.splice(randomIndex, 1)  // o(n)
    }

    return randomNumbers
}
```
This works pretty well, but it still has relatively poor quadratic performance (The time complexity of this function will be O(n^2). O(n) for while loop & O(n) for splice method. The problem is that when you remove each element from the original array (array.splice), you have to shift all the subsequent elements down to compact the array. This solution is good when range (N) & K are big but the problem is as N & K gets bigger & bigger, the time it takes to run this function will increase at an quadratic rate (Bog O notation of O(n^2))

## Solution 3 (Fisher–Yates shuffle)
The third method is to generate the numbers in the order first then shuffle them using Fisher–Yates shuffle; and then taking K numbers from beginning (or end) of the array. If we break it down in steps:
1. start index from 0 (we can start from index = len-1 as well)
2. pick a random number from the remaining values. Range to choose is from index+1 , to length - index - 1.
3. swap the number from current index with the random number picked at Step 2.
4. Repeat the above steps

The following is the main method of this solution:

```python
function shuffle(array) {
    let arrayLength = array.length
    let temp
    let swapIndex

    // While there remain elements to shuffle…
    while (arrayLength) {
      // Pick a remaining element…
      swapIndex = Math.floor(Math.random() * arrayLength--);

      // And swap it with the current element.
      temp = array[arrayLength];
      array[arrayLength] = array[swapIndex];
      array[swapIndex] = temp
    }

    return array
}
```

The time complexity of this function will be O(n) . This solution is good when range (N) & K are big but the problem is as N & K gets bigger & bigger, the time it takes to run this function will increase at linear rate (Bog O notation of O(n)). This solution is so good even when range (N) & K are getting bigger because of its linear Big o notation.

## Solution 4 (hash map)
The problem with the third solution is that if we want to pick M numbers within the range 0 to N without mutating the original array, we have to make a copy of the entire array and apply Fisher-Yates for just M items. We can use a hash map to track swipes that would otherwise occur in-place in Fisher-Yates. In fact, we are recording only the changes made to our array. Furthermore, we will keep that information around only for as long as we need. The following is the core method of this solution:

suppose we have an array with 5 integers:       1 2 3 4 *5
* Starting at the end, lets choose a random number from 1 to 5. We pick 3. we will have the following mapping: 3 => 5 & then we would return 3 (first random number)
* we move to 4, choose from 1 to 4. Record the mapping and return 2.

  mapping:
  3 => 5 & 2 => 4

  return values: 3, 2

* Now we are at 3. We pick 3. We see 3 maps to 5. So we return 5. We delete 3, because we are done with it.

  mapping:
  2 => 4

  return values: 3, 2, 5

* For index 2 we'll pick 1. We could write 1 => 2, but 2 already appears as a mapping, so we will resolve that and set 1 => 4.

  mapping:
  1 => 4

  return values: 3, 2, 5, 1
* Finally, for index 1, we resolve to 4. Our array looks like this:

  3 2 5 1 4

Like Fisher-Yates, we pick a random number up to pointer_index where pointer_index starts at maximum value in our range and decrements down by one each iteration. For each cycle we do three key things:

yield either the random index we choose or the swap value if we find a mapping for the random index in our dictionary, record a mapping for the randomly selected index to the current pointer, and delete a stored mappings for the current pointer, since all future iterations will be less than this value.

The following is the main method of this solution:

```python
function* shuffle(maxLength, quantity) {
    let swapMap = new Map()

    let swapMapValueOrKey = getMapKeyOrValue.bind(null , swapMap)

    let start = maxLength
    let end = maxLength - quantity

    for( let pointerIndex = start; pointerIndex > end ; pointerIndex--) {
      let randomIndex = randInt(pointerIndex)

      yield swapMapValueOrKey(randomIndex)

      swapMap.set(randomIndex, swapMapValueOrKey( pointerIndex ))

      if(swapMap.get( pointerIndex)) {
        swapMap.delete(pointerIndex)
      }
    }
}
```

The function swapMapValueOrKey looks up a key in a hash map, and returns the value if the key is found; otherwise, it returns the key. This method is capable of selecting the desired amount of numbers from all permutations.

By using a hash map, we are able to simulate the Fisher-Yates algorithm, picking K elements in a range 0 to N with O(K) time complexity.
