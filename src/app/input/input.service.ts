import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {CoolLocalStorage} from 'angular2-cool-storage';
import * as xml2js from 'xml2js'

import {Questions} from '../models/questions';
import {Question} from '../models/question';
import {Answer} from "../models/answer";

@Injectable()
export class InputService {
  private headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  private questionsUrl: string = 'assets/question.json';  // URL to web api
  private keywordUrl: string = 'assets/testexport.txt';

  constructor(private http: Http,
              private localStorage: CoolLocalStorage) {
  }

  retrieveQuestions(): Promise<Questions> {
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
  }

  getTestQuestions(): Promise<Array<Question>> {
    console.log('buildQuestions');
    return this.buildQuestions();
  }

  getKeywords(): Array<String> {
    let results: Array<String> = new Array<string>();
    return results;
  }

  buildQuestions(): Promise<Array<Question>> {
    let questionList: Array<Question> = new Array<Question>();
    let self = this;

    let tempQuestions = new Array<Question>();
    let questions: Array<Question> = $.extend(this.localStorage.getObject('questionInstance'), new Array<Question>()); // Copy JSONObject to Array<Question>
    // Check for valid object
    if (questions && !(Object.keys(questions).length === 0 && questions.constructor === Object)) {
      console.log('questions from cache:', questions);
      return Promise.resolve(questions);
    }

    return this.retrieveQuestions().then(questions => {
      let first = true;
      console.log('questions length', questions);
      jQuery.each(questions, function (index, value) {
        let question = new Question();
        let answers: Array<Answer> = new Array<Answer>();
        const depth = 0;

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
        if (!question.type) {
          console.log('type not defined? question:',question,value);
          question.type = 'radio';
        }
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
      questionItem.type = element.type;
      if (!questionItem.type) {
        console.log('type not defined? questionItem:',questionItem,element);
        questionItem.type = 'radio';
      }
      questionItem.type = questionItem.type.trim();
      element.answer.forEach(function (answerItem) {
        let answer = new Answer();
        answer.label = answerItem.label;
        answer.value = '';
        answer.help = answerItem.help ? answerItem.help : '';
        answer.keywords = answerItem.keywords ? answerItem.keywords : [];
        answer.methods = answerItem.methods ? answerItem.methods : [];
        if (answerItem.question) {
          answer.question = self.buildTree(answerItem.question, depth);
        } else {
          answer.question = new Array<Question>();
        }
        answers.push(answer);
      });
      questionItem.answer = answers;
      results.push(questionItem);
    });

    return results;
  }

  completeQuestionCount(questionList: Array<Question>): number {
    var self = this;

    let completeCount: number;
    if (!questionList) {
      completeCount = 0;
    } else {
      completeCount = questionList.length;
      jQuery.each(questionList, function (index: number, question: Question) {
        jQuery.each(question.answer, function (index: number, answer: Answer) {
          if (answer.question && answer.question.length) {
            completeCount += self.completeQuestionCount(answer.question);
          }
        });
      });
    }

    return completeCount;
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
