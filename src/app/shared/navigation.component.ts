import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../models/question";

@Component({
  selector: 'navigation-container',
  templateUrl: './navigation.component.html',
  styleUrls: ['../input/input.component.css']
})

export class NavigationComponent implements OnInit {
  @Input() questions: Array<Question>;
  @Output() onNavigate = new EventEmitter<Boolean>()

  ngOnInit(): void {
    console.log('navigation questions:', this.questions);
  }

  handleNavigation(): void {
    console.log("nav click", Array.isArray(this.questions), this.questions);
    let question: Question = this.nextQuestion(this.questions);
    if (question) {
      question.show = true;
    } else {
      this.onNavigate.emit(true);
    }
  }

  nextQuestion(questions: Array<Question>): Question {
    let question: Question;
    questions.every(function (item) {
      if (!item.value.length) {
        question = item;
        return false;
      }
      return true;
    })
    return question;
  }

}
