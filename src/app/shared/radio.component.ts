import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {QuestionComponent} from './question.component';

@Component({
  templateUrl: './radio.component.html',
  styleUrls: ['../input/input.component.css']
})
export class RadioComponent implements QuestionComponent {
  @Input() data: any;
  controllerName = 'radio' + (new Date().getUTCMilliseconds());
  answer = ''; //this.data?this.data.question.value:'';
  toggleExpand(): void {
    this.data.question.expanded = !this.data.question.expanded;
  }

  selectAnswer(): void {
    console.log("select answer");
  }

}
