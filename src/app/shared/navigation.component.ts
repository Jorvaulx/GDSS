import {Component, Input} from '@angular/core';
import {Question} from '../models/question';
import {InputService} from "../input/input.service";
import {QuestionItemList} from "../models/question-item-list";

@Component({
  selector: 'navigation-container',
  templateUrl: './navigation.component.html',
  styleUrls: ['../input/input.component.css'],
  providers: [InputService]
})

export class NavigationComponent {
  @Input() questions: Question[];
  nextQuestion: QuestionItemList;

  constructor(private inputService: InputService) {
  }

  handleNavigation(): void {
    //this.nextQuestion = this.inputService.buildTree(this.questions);
    console.log("nav click", this.nextQuestion);
  }


}
