import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question';

@Component({
  selector: 'navigation-container',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {
  @Input() question: Question;

  constructor() { }

  ngOnInit() {

  }
}
