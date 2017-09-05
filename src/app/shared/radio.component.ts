import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {QuestionComponent} from './question.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Question} from "../models/question";

@Component({
  templateUrl: './radio.component.html',
  styleUrls: ['../input/input.component.css']
})
export class RadioComponent implements QuestionComponent, OnInit {
  @Input() data: any;
  radioForm: FormGroup;
  radioControl: FormControl;
  enableNavigation: boolean;
  nextQuestions: Question[];

  toggleExpand(): void {
    if (this.data.question.value) {
      this.data.question.expanded = !this.data.question.expanded;
    }
  }

  selectAnswer(answer): void {
    this.data.question.value = answer.label;
    this.data.question.answer.forEach(function (item) {
      item.value = '';
    });
    answer.value = answer.label;
    console.log("select answer", this.data.question, answer, answer.value, this.data.question.value);
    if (answer.question.length) {
      this.nextQuestions = answer.question;
      this.enableNavigation = true;
    }

  }

  ngOnInit(): void {
    let self = this;
    this.radioForm = new FormGroup({
      radioControl: new FormControl('radio' + (new Date().getUTCMilliseconds()))
    });

    // check if question has been answered
    if (this.data.question.value && this.data.question.value.length) {
      this.data.question.answer.forEach(function (item) {
        if (item.value == this.data.question.value) {
          this.selectAnswer(item);
        }
      });
    }
  }

}
