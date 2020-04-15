import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayUtilities {
  constructor() {}

  public convertToTwoDimensions(
    model: object[],
    numberOfColumns: number
  ): object[][] {
    const toReturn: object[][] = [];

    if (model == null) {
      return toReturn;
    }

    /* Setting variables to -1 in order to avoid using checks for the first rows and columns */
    let row = -1;
    let column = -1;

    /* For each project inside provided array */
    for (let iterator = 0; iterator < model.length; iterator++) {
      /* If modulo operation returns 0 , it means that row in this iteration is going to be exceeded and new one is needed */
      if (iterator % numberOfColumns !== 0) {
        toReturn[row][column] = model[iterator];
        column++;
      } else {
        /* Reset column pointer, increment row, create new row and set first variable in the row  */
        column = 0;
        row++;
        toReturn[row] = [];
        toReturn[row][column] = model[iterator];
        column++;
      }
    }

    return toReturn;
  }
}
