import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {}

  public isDeliveryTimeValid(time: NgbTimeStruct): boolean {
    if (time == null)  {
      return false;
    }

    if (time.hour > environment.shopOpeningHour && time.hour < environment.shopClosingHour) {
      return true;
    }
    return false;
  }

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
