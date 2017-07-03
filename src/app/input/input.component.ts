import { Component, OnInit } from '@angular/core';
import { InputService } from './input.service';
import { Questions } from '../models/questions';

@Component({
  selector: 'app-instuctions-panel',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [InputService]
})
export class InputComponent implements OnInit {
  title = 'Input';
  questions: Questions;

  constructor(private inputService: InputService) {}

  getQuestions(): void {
    this.inputService.getQuestions().then(questions => this.questions = questions);
  }

  ngOnInit(): void {
    this.getQuestions();
  }
}
