import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberUtilities {

  constructor() {}

  public addLeftPaddingZeros(numberToFormat: number, numberOfDigits: number) {
    let returnValue: string = String(numberToFormat);
    while (returnValue.length < numberOfDigits) {
      returnValue = '0' + returnValue;
    }
    return returnValue;
  }
}
