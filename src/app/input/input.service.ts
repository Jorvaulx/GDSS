import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage';

import {CheckboxComponent} from '../shared/checkbox.component';

import {QuestionItem} from '../models/question-item';
import {Questions} from '../models/questions';
import {Question} from '../models/question';
import {Answer} from '../models/answer';
import {RadioComponent} from '../shared/radio.component';
import {TextComponent} from '../shared/text.component';
import {QuestionItemList} from "../models/question-item-list";

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
          this.localStorage.setObject('questions', body.questions || {});
          return body.questions || {};
        })
        .catch(this.handleError);
    } else {
      console.log('from Cache');
      return Promise.resolve(this.localStorage.getObject<Questions>('questions'));
    }
  }

  getTestQuestions(): Promise<QuestionItemList> {
    let forward = new Question();
    let back = new Question();
    let question = new Question();
    let questionList = new QuestionItemList();
    let self = this;

    const tempQuestions = [];
    return this.getQuestions().then(questions => {
      let first = true;
      jQuery.each(questions.folder[0].question, function (index, value) {
        question = new Question();
        const answer = [];
        value['answer'].forEach(function (value) {
          answer.push(value);
        });
        question.answer = answer;
        question.type = value['type']

        if (first) {
          question.expanded = true;
          first = false;
        } else {
          question.expanded = value['expanded']?value['expanded']:false;
        }
        question.help = value['help']?value['help']:'';
        question.label = value['label']?value['label']:'label missing';

        console.log("value,index",value,index,question,answer);
        tempQuestions.push(new QuestionItem(self.determineComponent(question), {question: question}));
        console.log("question",question,questions);
      });
      questionList.questions = tempQuestions;
      console.log('tempQuestions',tempQuestions);
      return questionList;
    });
  }

  getTestQuestion(): Promise<QuestionItem> {
    let forward = new Question();
    let back = new Question();
    let question = new Question();
    let folderIndex: number;
    let questionIndex: string;
    let questionTree: string;

    const answers = [];
    return this.getQuestions().then(questions => {
      folderIndex = 0;
      questionIndex = '';

      if (this.localStorage.getItem('folder')) {
        folderIndex = parseInt(this.localStorage.getItem('folder'), 10);
        this.localStorage.setItem('folder', '0');
      }


      if (this.localStorage.getItem('')) {
        questionTree = JSON.parse(this.localStorage.getItem('questionTree'));
      }
      question = questions.folder[folderIndex].question[0];
      question.answer.forEach(function (value) {
        answers.push(value);
      });
      question.answer = answers;
      console.log('answer:', answers, question);

      /* Navigation */
      forward = question;
      back = question;

      return new QuestionItem(this.determineComponent(question), {question: question});
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
