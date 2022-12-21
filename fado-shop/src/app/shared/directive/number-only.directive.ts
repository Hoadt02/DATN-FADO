import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[numberOnly]',
})
export class NumberOnlyDirective {

  @Input() nullable = true;
  @Input() minValue!: number;
  @Input() maxValue!: number;

  constructor(private ref: ElementRef) {
  }

  @HostListener('input', ['$event'])
  @HostListener('focus', ['$event'])
  @HostListener('keypress', ['$event'])
  @HostListener('cut', ['$event'])
  @HostListener('paste', ['$event'])
  onInputChange(event: any) {
    let initalValue = this.ref.nativeElement.value;
    initalValue = initalValue.replace(/[^0-9]*/g, '');
    if (Number(this.maxValue) && Number(initalValue) > Number(this.maxValue)) {
      initalValue = this.maxValue;
    }
    if (Number(this.minValue) && Number(initalValue) < Number(this.minValue)) {
      initalValue = this.minValue;
    }
    this.ref.nativeElement.value = initalValue;
    if (initalValue !== this.ref.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('blur', ['$event']) onInputBlur(event : any) {
    let initialValue = this.ref.nativeElement.value;
    initialValue = initialValue.replace(/[^0-9.]*/g, '');
    if (initialValue.trim() === '' || Number(initialValue) < 0) {
      initialValue = '';
    }
    if (Number(this.maxValue) && Number(initialValue) > Number(this.maxValue)) {
      initialValue = this.maxValue;
    }
    if (Number(this.minValue) && Number(initialValue) < Number(this.minValue)) {
      initialValue = this.minValue;
    }
    if (initialValue !== this.ref.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
