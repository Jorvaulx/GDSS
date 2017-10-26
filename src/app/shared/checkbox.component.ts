import {Component, Input, OnInit} from '@angular/core';

import {QuestionComponent} from './question.component';
import {Question} from "../models/question";
import {NavCommunicatorService} from "./nav-communicator.service";
import {Option} from "../models/option";
import {CoolLocalStorage} from "angular2-cool-storage";

@Component({
  selector: 'checkbox-component',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../input/input.component.css'],
  providers: [NavCommunicatorService]
})
export class CheckboxComponent implements QuestionComponent, OnInit {
  @Input() data: Question;
  @Input() allQuestions: Array<Question>;

  enableNavigation: boolean;
  nextQuestions: Array<Question>;
  checkbox: Array<Option>;

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
          console.log("Last Question?");
        }
      }
      this.enableNavigation = false;
      this.data.expanded = false;
      this.localStorage.setObject('questionInstance', this.allQuestions);
    })
  }

  toggleExpand(): void {
    if (this.data.value && !this.data.expanded) {
      // Call service to reset values
      console.log("call service to clear values");
      this.navService.clearQuestion(true);
      this.data.value = [];
      this.resetQuestions();
      this.data.expanded = true;
    }
  }

  selectAnswer(answer: Option): void {
    var self = this;
    answer.checked = !answer.checked;
    this.data.value = [];
    this.enableNavigation = false;
    this.checkbox.forEach(function (item) {
      if (item.checked) {
        self.data.value.push(item.label);
        self.enableNavigation = true;
      }
    });
console.log('select Answer:',this.data.value);
    this.nextQuestions = this.determineNextQuestion();
  }

  ngOnInit(): void {
    this.resetQuestions();
  }

  resetQuestions(): void {
    var self = this;
    self.checkbox = new Array<Option>();
    jQuery.each(this.data.answer, function (index, element) {
      let option = new Option();
      option.label = element.label;
      option.help = element.help;
      option.checked = self.data.value && self.data.value.indexOf(option.label) > -1;
      self.checkbox.push(option);
    });
  }

  determineNextQuestion(): Array<Question> {
    var self = this;
    let questions: Array<Question>;
    jQuery.each(this.data.answer, function (index, answer) {
      if (answer.question && answer.question.length) {
        self.checkbox.every(function (item, index) {
          if (item.checked && item.label === answer.label) {
            questions = answer.question;
            // Exit Loop
            return false;
          }
          // Continue
          return true;
        });
      }
      // Exit Loop
      if (questions)
        return false;
    })
    return questions;
  }

}
