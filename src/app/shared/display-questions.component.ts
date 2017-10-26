
import {Component, Input, OnInit} from "@angular/core";
import {QuestionItemList} from "../models/question-item-list";
import {Question} from "../models/question";

@Component({
  selector: 'display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['../input/input.component.css']

})

export class DisplayQuestionComponent implements OnInit {
  @Input() questions: Array<Question>;
  @Input() allQuestions: Array<Question>;

  ngOnInit(): void {
    // console.log("display-questions - questions:", this.questions);
  }
  getCSSClass(depth:number):string {
    let cssClass:string ='';
    switch(depth) {
      case 0:
        break;
      case 1:
        cssClass='levelOne';
        break;
      case 2:
        cssClass='levelTwo';
        break;
      case 3:
        cssClass='levelThree';
        break;
      default:
        cssClass='levelFour';
    }
    return cssClass;
  }
}
