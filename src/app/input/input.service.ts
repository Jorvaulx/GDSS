import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Questions } from '../models/questions';

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

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
