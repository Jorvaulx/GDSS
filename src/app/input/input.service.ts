import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { CheckboxComponent } from '../shared/checkbox.component';

import { QuestionItem } from '../shared/question-item';
import { Questions } from '../models/questions';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { RadioComponent } from '../shared/radio.component';
import { TextComponent } from '../shared/text.component';

@Injectable()
export class InputService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private questionsUrl = 'assets/question.json';  // URL to web api


  constructor(private http: Http) { }

  getQuestions(): Promise<Questions> {
    return this.http.get(this.questionsUrl)
              .toPromise()
              .then(this.extractData)
              .catch(this.handleError);
  }

  getTestQuestion(): Promise<QuestionItem> {
    let question1 = new Questions();
    let question = new Question();
    const answer = [];
    return this.getQuestions().then(questions => {
      question1 = questions;
      question = questions.folder[0].question[0];
      question.answer.forEach(function(value){
        answer.push(value);
      });
      question.answer = answer;
      console.log('answer:', answer, question);
      return new QuestionItem(this.determineComponent( question ), { question: question });
    });
  }

  private determineComponent(question: Question) {
    switch (question.type) {
     case 'checkbox': {
       return CheckboxComponent;
      }
      case 'textline': {
        return TextComponent;
      }
      default: {
        return RadioComponent;
      }
    }
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.questions || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
