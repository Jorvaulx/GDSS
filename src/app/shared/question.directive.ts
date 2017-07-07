import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[input-host]',
})
export class QuestionDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
