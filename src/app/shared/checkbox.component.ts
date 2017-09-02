import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';

@Component({
  templateUrl: './checkbox.component.html',
  styleUrls: ['../input/input.component.css']
})
export class CheckboxComponent implements QuestionComponent {
  @Input() data: any;

  toggleExpand():void {
    this.data.question.expanded = !this.data.question.expanded;
  }

}
