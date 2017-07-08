import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';

@Component({
  templateUrl: './text.component.html'
})
export class TextComponent implements QuestionComponent {
  @Input() data: any;

}
