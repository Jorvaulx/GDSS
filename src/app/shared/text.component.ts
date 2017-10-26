import { Component, Input } from '@angular/core';

import { QuestionComponent } from './question.component';
import {Question} from "../models/question";
import {Answer} from "../models/answer";
import {NavCommunicatorService} from "./nav-communicator.service";
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'textbox-component',
  templateUrl: './text.component.html',
  styleUrls: ['../input/input.component.css'],
  providers: [NavCommunicatorService]
})
export class TextComponent implements QuestionComponent {
  @Input() data: Question;
  @Input() allQuestions: Array<Question>;

  answer: string;
  enableNavigation: boolean;
  nextQuestions: Array<Question>;

  constructor(private navService: NavCommunicatorService,
              private localStorage: CoolLocalStorage) {
    this.navService.confirmNavigation$.subscribe(nextQuestionProcessed => {
      if (!nextQuestionProcessed) {
        // Find next question to open
        let nextQuestion = this.navService.nextQuestion(this.allQuestions);
        nextQuestion.show = true;
        nextQuestion.expanded = true;
      }
      this.enableNavigation = false;
      this.data.expanded = false;
      this.localStorage.setObject('questionInstance', this.allQuestions);
    })
  }

  detectChange(): void {
    console.log('detectChange');
    this.data.value = [this.answer];

    if (this.data.value && this.data.value.length) {
      console.log('detectChange change:',this.answer,this.data.value);
      this.enableNavigation = true;
    } else {
      console.log('detectChange noChange');
      this.enableNavigation = false;
    }
  }

  toggleExpand(): void {
    if (this.data.value && !this.data.expanded) {
      // Call service to reset values
      console.log("call service to clear values");
      this.navService.clearQuestion(true);
      this.data.value = [];
      this.data.expanded = true;
    }
  }

  selectAnswer(answer:Answer): void {
    if (answer.question.length) {
      this.nextQuestions = answer.question;
      this.enableNavigation = true;
    }

  }

}
