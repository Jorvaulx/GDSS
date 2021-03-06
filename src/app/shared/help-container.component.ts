import { Component, Input } from '@angular/core';
import { QuestionItem } from '../models/question-item';

@Component({
  selector: 'help-container',
  templateUrl: './help-container.component.html'
})

export class HelpContainerComponent {
  @Input() question: QuestionItem;

  constructor() { }
}
