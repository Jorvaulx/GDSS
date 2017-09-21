import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage';

import {CheckboxComponent} from '../shared/checkbox.component';

import {QuestionItem} from '../models/question-item';
import {Questions} from '../models/questions';
import {Question} from '../models/question';
import {RadioComponent} from '../shared/radio.component';
import {TextComponent} from '../shared/text.component';
import {QuestionItemList} from "../models/question-item-list";
import {Answer} from "../models/answer";

@Injectable()
export class InputService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private questionsUrl = 'assets/question.json';  // URL to web api

  constructor(private http: Http,
              private localStorage: CoolLocalStorage) {
  }

  getQuestions(): Promise<Questions> {
    //if (!this.localStorage.tryGetObject('questions')) {
    console.log('not in Cache');
    return this.http.get(this.questionsUrl)
      .toPromise()
      .then(res => {
        const body = res.json();
        console.log('asdasda', body);
        this.localStorage.setObject('questions', body.question || {});
        return body.question || {};
      })
      .catch(this.handleError);
    // } else {
    //   console.log('from Cache');
    //   return Promise.resolve(this.localStorage.getObject<Questions>('questions'));
    // }
  }

  getTestQuestions(): Promise<Array<Question>> {
    // if (!this.localStorage.tryGetObject('questionInstance')) {
    console.log('buildQuestions');
    return this.buildQuestions();
    // }
    //
    // console.log('from Cache');
    // return Promise.resolve(this.localStorage.getObject<QuestionItemList>('questionInstance'));
  }

  buildQuestions(): Promise<Array<Question>> {
    let questionList: Array<Question> = new Array<Question>();
    let self = this;

    const tempQuestions = [];
    return this.getQuestions().then(questions => {
      let first = true;
      console.log('questions length', questions);
      jQuery.each(questions, function (index, value) {
        let question = new Question();
        let answers: Array<Answer> = new Array<Answer>();
        const depth = 0;

        console.log('value', value);
        value['answer'].forEach(function (answerItem) {
          let answer = new Answer();
          answer.label = answerItem.label;
          answer.value = '';
          answer.help = answerItem.help;
          answer.keywords = answerItem.keywords ? answerItem.keywords : [];
          answer.methods = answerItem.methods ? answerItem.methods : [];

          if (answerItem.question)
            answer.question = self.buildTree(answerItem.question, depth);
          answers.push(answer);
        });
        question.answer = answers;
        question.type = value['type'];
        if (!question.type)
          question.type = 'radio';
        question.type = question.type.trim();
        question.show = true;
        question.depth = 0;

        if (first) {
          question.expanded = true;
          first = false;
        } else {
          question.expanded = value['expanded'] ? value['expanded'] : false;
        }
        question.help = value['help'] ? value['help'] : '';
        question.label = value['label'] ? value['label'] : 'label missing';
        console.log('set type', question);

        tempQuestions.push(question);
      });
      this.localStorage.setObject('questionInstance', tempQuestions);
      return tempQuestions;
    });
  }

  buildTree(questions: Question[], depth: number): Array<Question> {
    let results: Array<Question> = new Array<Question>();
    let self = this;
    depth = +1;
    jQuery.each(questions, function (index, element) {
      let questionItem: Question = new Question();
      let answers: Array<Answer> = new Array<Answer>();

      questionItem.help = element.help;
      questionItem.value = [];
      questionItem.label = element.label;
      questionItem.show = false;
      questionItem.expanded = false;
      questionItem.depth = depth;
      if (!questionItem.type)
        questionItem.type = 'radio';
      questionItem.type = questionItem.type.trim();
      element.answer.forEach(function (answerItem) {
        let answer = new Answer();
        answer.label = answerItem.label;
        answer.value = '';
        answer.help = answerItem.help?answerItem.help:'';
        answer.keywords = answerItem.keywords ? answerItem.keywords : [];
        answer.methods = answerItem.methods ? answerItem.methods : [];
        if (answerItem.question) {
          answer.question = self.buildTree(answerItem.question, depth);
        }  else {
          answer.question = new Array<Question>();
        }
        answers.push(answer);
      });
      questionItem.answer = answers;
      results.push(questionItem);
    });

    return results;
  }

  saveQuestion(questionLabel: String, answer: String[]): void {
    // console.log('questions e',questionLabel,answer);
    // this.getTestQuestions().then(questions => {
    //   let first = true;
    //   console.log('questions',questions,questionLabel,answer);
    // });
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
