import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';
import {Question} from "../models/question";

@Component({
  templateUrl: './text.component.html',
  styleUrls: ['../input/input.component.css']
})
export class TextComponent implements QuestionComponent {
  @Input() data: any;
  enableNavigation: boolean;
  nextQuestions: Question[];

  toggleExpand(): void {
    if (this.data.question.value) {
      this.data.question.expanded = !this.data.question.expanded;
    }
  }

  selectAnswer(answer): void {
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
