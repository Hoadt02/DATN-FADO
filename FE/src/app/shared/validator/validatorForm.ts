import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function checkSpace(c: AbstractControl) {
  return (c.value.trim() == '') ? {isSpace: true} : null;
}

export function checkTypeDiscount(type: any, discount: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const formGroup = control as FormGroup;
    const valueOfType = formGroup.get(type)?.value
    const valueOfDiscount = formGroup.get(discount)?.value

    if (valueOfType == true && valueOfDiscount > 100) {
      console.log('CÓ lỗi');
      return {isType: true}
    } else {
      console.log('không lỗi');
      return null;
    }
  }
}
