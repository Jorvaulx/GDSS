import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';

@Component({
  templateUrl: './radio.component.html'
})
export class RadioComponent implements QuestionComponent {
  @Input() data: any;

}
