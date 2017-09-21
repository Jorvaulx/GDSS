import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';
import {Question} from "../models/question";
import {Answer} from "../models/answer";

@Component({
  selector: 'checkbox-component',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../input/input.component.css']
})
export class CheckboxComponent implements QuestionComponent {
  @Input() data: Question;
  enableNavigation: boolean;
  nextQuestions: Array<Question>;

  toggleExpand(): void {
    if (this.data.value) {
      this.data.expanded = !this.data.expanded;
    }
  }

  selectAnswer(answer:Answer): void {
    // this.data.question.value = answer.label;
    // this.data.question.answer.forEach(function (item) {
    //   item.value = '';
    // });
    // answer.value = answer.label;
    // console.log("select answer", this.data.question, answer, answer.value, this.data.question.value);
    if (answer.question.length) {
      this.nextQuestions = answer.question;
      this.enableNavigation = true;
    }

  }

}
