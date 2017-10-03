import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../models/question";
import {NavCommunicatorService} from "./nav-communicator.service";

@Component({
  selector: 'navigation-container',
  templateUrl: './navigation.component.html',
  styleUrls: ['../input/input.component.css']
})

export class NavigationComponent implements OnInit {
  @Input() questions: Array<Question>;

  constructor(private navService: NavCommunicatorService) {
    this.navService.clear$.subscribe(clearQuestion =>{
      console.log("this worked - clear",clearQuestion);
      this.clearSubsequentQuestions(this.questions);
    })
  }

  ngOnInit(): void {
    console.log('navigation questions:', this.questions);
  }

  handleNavigation(): void {
    console.log("nav click", Array.isArray(this.questions), this.questions);
    let question: Question = this.nextQuestion(this.questions);
    let nextQuestionProcessed: boolean = false;
    if (question) {
      question.show = true;
      question.expanded = true;
      nextQuestionProcessed = true;
    }
    this.navService.processClick(nextQuestionProcessed);
  }

  nextQuestion(questions: Array<Question>): Question {
    let question: Question;
    if (questions) {
      questions.every(function (item) {
        if (!item.value.length) {
          question = item;
          return false;
        }
        return true;
      });
    }
    return question;
  }

  clearSubsequentQuestions(questions:Array<Question>) {
    var self = this;
    if (questions) {
      jQuery.each(questions, function (index, question) {
        question.expanded=false;
        question.show = false;
        question.value=[];
        jQuery.each(question.answer, function (index, answer) {
          if (answer.question) {
              self.clearSubsequentQuestions(answer.question);
          }
        });
      });
    }

  }

}
