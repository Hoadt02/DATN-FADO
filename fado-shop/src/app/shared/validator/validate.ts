import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkSpace(c: AbstractControl) {
  return (c.value.trim() == '') ? {isSpace: true} : null;
}

export function checkCheckPrice(startPrice: any, endPrice: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const formGroup = control as FormGroup;
    const valueStartPrice = formGroup.get(startPrice)?.value
    const valueEndPrice = formGroup.get(endPrice)?.value

    if (valueStartPrice > valueEndPrice || valueStartPrice == valueEndPrice) {
      return {isCheckPrice: true}
    } else {
      return null;
    }
  }
}

export function formatDate(date : any) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}
