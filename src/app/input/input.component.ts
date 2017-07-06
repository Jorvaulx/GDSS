import { Component, OnInit } from '@angular/core';
import { InputService } from './input.service';
import { Questions } from '../models/questions';
import { Folder } from '../models/folder';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-instuctions-panel',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [InputService]
})

export class InputComponent implements OnInit {
  title = 'Input';
  questions: Questions;
  localStorage: CoolLocalStorage;

  constructor(private inputService: InputService,
    localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  getQuestions(): void  {
    if (this.localStorage.tryGetObject('questions')) {
      this.inputService.getQuestions().then(questions => {
        this.questions = questions;
        this.localStorage.setObject('questions',questions);
      });
    } else {
      this.questions = this.localStorage.getObject<Questions>('questions');
    }
  }

  getCurrentResults(): void  {
    if (this.localStorage.tryGetObject('results')) {
      this.displayQuestion(this.questions.folder[0].question[0]);
    } else {
      this.questions = this.localStorage.getObject<Questions>('questions');
    }
  }
  displayQuestion(question): void {
    
  }

  ngOnInit(): void {
    this.getQuestions();
    this.getCurrentResults()
  }
}
