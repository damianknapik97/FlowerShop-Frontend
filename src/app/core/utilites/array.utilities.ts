import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayUtilities {
  constructor() {}

  public convertToTwoDimensions(model: object[], numberOfColumns: number): object[][] {
    const toReturn: object[][] = new Array();
    let row = 0;
    let column = 0;

    if (model == null) {
      return toReturn;
    }

    for (let iterator = 0; iterator < model.length; iterator++) {
      if (iterator % numberOfColumns !== 0 ) {
        toReturn[row][column] = model[iterator];
        column++;
      } else {
        row++;
      }
    }

    return toReturn;
  }
}

