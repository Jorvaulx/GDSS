import {Component, OnInit} from '@angular/core';
import {InputService} from './input.service';
import {Questions} from '../models/questions';
import {Question} from '../models/question';
import {QuestionItem} from '../models/question-item';
import {QuestionItemList} from "../models/question-item-list";

@Component({
  selector: 'app-instuctions-panel',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  title = 'Input';
  questionList: Array<Question>;

  constructor(private inputService: InputService) {
  }


  getTestQuestions(): void {
    this.inputService.getTestQuestions().then(questionItem => {
      this.questionList = questionItem
      console.log('getTestQuestions:', this.questionList);
    });
  }


  ngOnInit(): void {
    this.getTestQuestions();
  }

}
