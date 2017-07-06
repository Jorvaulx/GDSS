import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[input-host]',
})
export class InputDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
