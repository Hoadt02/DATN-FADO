import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkCheckPrice(startPrice: any, endPrice: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const formGroup = control as FormGroup;
    const valueStartPrice = formGroup.get(startPrice)?.value
    const valueEndPrice = formGroup.get(endPrice)?.value

    if (valueStartPrice > valueEndPrice) {
      return {isCheckPrice: true}
    } else {
      return null;
    }
  }
}
