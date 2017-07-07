import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';

@Component({
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements QuestionComponent {
  @Input() data: any;

}
