import {AbstractControl} from '@angular/forms';

export function checkSpace(c: AbstractControl) {
  return (c.value.trim() == '') ? {isSpace: true} : null;
}

export function checkTypeDiscount(c: AbstractControl) {
  const v = c.value;
  return (v.type == 1 && v.discount > 100) ? {isType: true} : null;
}
