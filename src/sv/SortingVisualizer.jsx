import React from "react";
import "./SortingVisualizer.css";

import {
  getBubbleSortAnimations,
  getMergeSortAnimations,
  getQuickSortAnimations,
} from "./SortingAlgos/SortingAlgos";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 165;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomNumberInInteval(2, 480));
    }
    this.setState({ array });
  }

  //   mergeSort() {
  //     const javascriptSortedArray = this.state.array
  //       .slice()
  //       .sort((a, b) => a - b);

  //     const sortedArray = mergeSort(this.state.array);

  //     console.log(arrayAreEqaul(javascriptSortedArray, sortedArray));
  //   }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    animations.forEach((animation, i) => {
      const isColorChange = animation[0] === "compare";
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

      setTimeout(() => {
        if (isColorChange) {
          const [, barOneIdx, barTwoIdx] = animation;
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        } else {
          const [, barIdx, newHeight] = animation;
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }
      }, i * ANIMATION_SPEED_MS);
    });
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    animations.forEach((animation, i) => {
      const isColorChange = animation[0] === "compare";
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

      setTimeout(() => {
        if (isColorChange) {
          const [, barOneIdx, barTwoIdx] = animation;
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        } else {
          const [, barIdx, newHeight] = animation;
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }
      }, i * ANIMATION_SPEED_MS);
    });
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  //   testSortingAlgorithms() {
  //     for (let i = 0; i < 100; i++) {
  //       const array = [];
  //       const length = randomNumberInInteval(1, 1000);
  //       for (let i = 0; i < length; i++) {
  //         array.push(randomNumberInInteval(-1000, 1000));
  //       }
  //       const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //       const mergeSortedArray = getMergeSortAnimations(array.slice());
  //       console.log(arrayAreEqaul(javaScriptSortedArray, mergeSortedArray));
  //     }
  //   }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}

        <div className="button-container">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          {/* <button onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button> */}
        </div>
      </div>
    );
  }
}
function randomNumberInInteval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function arrayAreEqaul(arr1, arr2) {
//   if (arr1.length !== arr2.length) {
//     return false;
//   }
//   for (let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) {
//       return false;
//     }
//   }
//   return true;
// }
