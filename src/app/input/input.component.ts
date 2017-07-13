import { Component, OnInit } from '@angular/core';
import { InputService } from './input.service';
import { Questions } from '../models/questions';
import { Question } from '../models/question';
import { Folder } from '../models/folder';
import { QuestionItem } from '../shared/question-item';

@Component({
  selector: 'app-instuctions-panel',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [InputService]
})

export class InputComponent implements OnInit {
  title = 'Input';
  backQuestion: Question;
  nextQuestion: Question;
  questions: Questions;
  question: QuestionItem;

  constructor(private inputService: InputService) {
  }

  getQuestions(): void  {
    this.inputService.getQuestions().then(questions => {
      this.questions = questions;
    });
  }
  getTestQuestion(): void {
    this.inputService.getTestQuestion().then(questionItem => {
      this.question = questionItem
      console.log('getTest:', this.question);
    });
  }


  ngOnInit(): void {
    // this.getQuestions();
    this.getTestQuestion();
  }

}
