import {Component, Input, OnInit} from '@angular/core';

import {QuestionComponent} from './question.component';
import {FormControl, FormGroup} from "@angular/forms";
import {Question} from "../models/question";
import {Answer} from "../models/answer";

@Component({
  selector: 'radio-component',
  templateUrl: './radio.component.html',
  styleUrls: ['../input/input.component.css']
})
export class RadioComponent implements QuestionComponent, OnInit {
  @Input() data: Question;
  radioForm: FormGroup;
  enableNavigation: boolean;
  nextQuestions: Question[];

  constructor() {
  }

  toggleExpand(): void {
    if (this.data.value) {
      this.data.expanded = !this.data.expanded;
    }
  }

  selectAnswer(answer: Answer): void {
    this.data.value = [answer.label];
    this.data.answer.forEach(function (item) {
      item.value = '';
    });
    answer.value = answer.label;
    console.log("select original:", this.data);
    console.log("select answer:", answer);
    console.log("select answer.value:", answer.value);
    console.log("select this.data.question.value:", this.data.value);

    if (answer.question.length) {
      console.log('navigation on?');
      this.nextQuestions = answer.question;
      this.enableNavigation = true;
    }

  }

  onNavigate(show: boolean): void {
    console.log("onNavigate");
  }

  ngOnInit(): void {
    let self = this;
    this.radioForm = new FormGroup({
      radioControl: new FormControl('radio' + (new Date().getUTCMilliseconds()))
    });
    console.log('this.data:', this.data);
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
