import {AbstractControl} from '@angular/forms';

export function checkSpace( c: AbstractControl ) {
  return ( c.value.trim() == '' ) ? {isSpace: true}: null ;
}
