import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {}

  /**
   * Check if provided time values match the shop open hours
   *
   * @param time - time structure to validate.
   */
  public isDeliveryTimeValid(time: NgbTimeStruct): boolean {
    if (time == null)  {
      return false;
    }

    if (time.hour > environment.shopOpeningHour && time.hour < environment.shopClosingHour) {
      return true;
    }
    return false;
  }

  /**
   * Determine if fields are valid or not, and return according class string
   *
   * @param isFormSubmitted - param checking if form was subbmited
   * @param invalid  - param checking if form was subbmited with valid inputs.
   */
  public determineInputFieldStatus(isFormSubmitted: boolean, invalid: boolean): string {
    if (isFormSubmitted) {
      if (invalid) {
        return 'is-invalid';
      } else {
        return 'is-valid';
      }
    }
    return '';
  }

}
