import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../models/question';
import {Answer} from "../models/answer";

@Component({
  selector: 'navigation-container',
  templateUrl: './navigation.component.html',
  styleUrls: ['../input/input.component.css']
})

export class NavigationComponent implements OnInit {
  @Input() questions: Question[];
  nextQuestion: Question;

  constructor() {
  }

  ngOnInit() {
  }

  handleNavigation(): void {
    let results = [];
    console.log("this questions:", this.questions);

    results = this.buildTree(this.questions);
    // need to translate to QuestionItem so that componentType can be defined
    // this.nextQuestion = results[0];
    console.log("nav click",results);
  }

  buildTree(questions: Question[]): Question[] {
    let complete = false;
    let results = [];
    let self = this;

    questions.every(function (element, index) {
      let questionItem = new Question();
      let answers = [];

      questionItem = element;

      if (questionItem.value && questionItem.value.length) {
        answers = questionItem.answer;
        questionItem.answer = []; // Clear out answers
        answers.forEach(function (answerItem) {
          questionItem.value.forEach(function(savedValue){
            if (savedValue == answerItem.label) {
              answerItem.question = self.buildTree(answerItem.question);
              questionItem.answer.push(answerItem);
            }
          });
        });
        console.log("found values",questionItem);
        results.push(questionItem);
      } else {
        console.log("not found values",questionItem);
        questionItem.answer.forEach(function(answerItem){
          answerItem.question = []; // clear out questions above
        })
        results.push(questionItem);
        return false; // exit out of loop
      }
      return true;
    });

    return results;

  }
}
