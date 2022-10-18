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
      // console.log('Có lỗi tiền');
      return {isType: true}
    } else {
      // console.log('Không lỗi tiền');
      return null;
    }
  }
}

export function checkDate(startDate: any, endDate: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const range = control as FormGroup;
    const valueStartDate = range.get(startDate)?.value
    const valueEndDate = range.get(endDate)?.value

    console.log('ngày bắt đầu: ', valueStartDate)
    console.log('ngày kết thúc: ', valueEndDate)

    if (valueEndDate < valueStartDate) {
      console.log('CÓ lỗi date');
      return {isCheckDate: true}
    } else {
      console.log('không lỗi date');
      return null;
    }
  }

}
