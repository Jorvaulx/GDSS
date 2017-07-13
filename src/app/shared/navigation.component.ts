import { Component, Input, OnInit } from '@angular/core';
import { QuestionItem } from './question-item';

@Component({
  selector: 'navigation-container',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {
  @Input() question: QuestionItem;

  constructor() { }

  ngOnInit() {

  }
}
