import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayUtilities {
  constructor() {}

  public convertToTwoDimensions(model: object[], numberOfColumns: number): object[][] {
    const toReturn: object[][] = [];
    let row = 0;
    let column = 0;
    if (model == null) {
      return toReturn;
    }

    for (let iterator = 0; iterator < model.length; iterator++) {
      if ((iterator % numberOfColumns + 1) !== 0 ) {
        if (!toReturn[row]) {  // Lazy initialization
          toReturn[row] = [];
        }
        toReturn[row][column] = model[iterator];
        column++;
      } else {
        row++;
      }
    }

    return toReturn;
  }
}

