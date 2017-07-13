import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { CoolLocalStorage } from 'angular2-cool-storage';

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
  localStorage: CoolLocalStorage;


  constructor(private http: Http,
    localStorage: CoolLocalStorage) {
    this.localStorage = localStorage;
  }

  getQuestions(): Promise<Questions> {
    if (!this.localStorage.tryGetObject('questions')) {
      console.log('not in Cache');
      return this.http.get(this.questionsUrl)
              .toPromise()
              .then(res => {
                const body = res.json();
                this.localStorage.setObject('questions', body.questions || { });
                return body.questions || { };
              })
              .catch(this.handleError);
    } else {
      console.log('from Cache');
      return Promise.resolve(this.localStorage.getObject<Questions>('questions'));
    }
  }

  getTestQuestion(): Promise<QuestionItem> {
    let forward = new Question();
    let back = new Question();
    let question = new Question();
    let folderIndex: number;
    let questionIndex: string;
    let questionTree: string;

    const answer = [];
    return this.getQuestions().then(questions => {
      folderIndex = 0;
      questionIndex = '';

      if (this.localStorage.getItem('folder')) {
        folderIndex = parseInt( this.localStorage.getItem('folder'), 10 );
        this.localStorage.setItem('folder', '0');
      }


      if (this.localStorage.getItem('')) {
        questionTree = JSON.parse(this.localStorage.getItem('questionTree'));
      }
      question = questions.folder[folderIndex].question[0];
      question.answer.forEach(function(value){
        answer.push(value);
      });
      question.answer = answer;
      console.log('answer:', answer, question);

      /* Navigation */
      forward = question;
      back = question;
      
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
