import {Component, Input, OnInit} from '@angular/core';

import {QuestionComponent} from './question.component';
import {FormControl, FormGroup} from "@angular/forms";
import {Question} from "../models/question";
import {Answer} from "../models/answer";
import {NavCommunicatorService} from "./nav-communicator.service";
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'radio-component',
  templateUrl: './radio.component.html',
  styleUrls: ['../input/input.component.css'],
  providers: [NavCommunicatorService]
})
export class RadioComponent implements QuestionComponent, OnInit {
  @Input() data: Question;
  @Input() allQuestions: Array<Question>;

  radioForm: FormGroup;
  enableNavigation: boolean;
  nextQuestions: Array<Question>;

  constructor(private navService: NavCommunicatorService,
              private localStorage: CoolLocalStorage) {
    this.navService.confirmNavigation$.subscribe(nextQuestionProcessed => {
      if (!nextQuestionProcessed) {
        // Find next question to open
        let nextQuestion = this.navService.nextQuestion(this.allQuestions);
        if (nextQuestion) {
          nextQuestion.show = true;
          nextQuestion.expanded = true;
        } else {
          // Last Question?
          console.log("last question",$("#progressBar").text());
          $("#progressBar").text("100% Complete");
          console.log('Total Number of Question:',$('#completeCount').val());
        }
      }
      console.log('percent complete',100-this.navService.percentComplete(this.allQuestions));
      let progress =  100-this.navService.percentComplete(this.allQuestions)
      $("#progressBar").text(progress+"%");
      this.enableNavigation = false;
      this.data.expanded = false;

      this.localStorage.setObject('questionInstance', this.allQuestions);
    });
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

  selectAnswer(answer: Answer): void {
    this.data.value = [answer.label];
    this.data.answer.forEach(function (item) {
      item.value = '';
    });
    answer.value = answer.label;

    if (answer.question && answer.question.length) {
      this.nextQuestions = answer.question;
    }

    this.enableNavigation = true;
  }

  ngOnInit(): void {
    let self = this;
    this.radioForm = new FormGroup({
      radioControl: new FormControl('radio' + (new Date().getUTCMilliseconds()))
    });
    // check if question has been answered
    if (this.data.value && this.data.value.length) {
      this.data.answer.forEach(function (item) {
        // if (self.data.value.indexOf(item.value)>-1) {
        //   self.selectAnswer(item);
        // }
      });
    }
  }

}
