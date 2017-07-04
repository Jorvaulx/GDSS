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


//  getHero(id: number): Promise<Hero> {
//    const url = `${this.questionsUrl}/${id}`;
//    return this.http.get(url)
//      .toPromise()
//      .then(response => response.json().data as Hero)
//      .catch(this.handleError);
//  }
//
//  delete(id: number): Promise<void> {
//    const url = `${this.questionsUrl}/${id}`;
//    return this.http.delete(url, {headers: this.headers})
//      .toPromise()
//      .then(() => null)
//      .catch(this.handleError);
//  }
//
//  create(name: string): Promise<Hero> {
//    return this.http
//      .post(this.questionsUrl, JSON.stringify({name: name}), {headers: this.headers})
//      .toPromise()
//      .then(res => res.json().data as Hero)
//      .catch(this.handleError);
//  }
//
//  update(hero: Hero): Promise<Hero> {
//    const url = `${this.questionsUrl}/${hero.id}`;
//    return this.http
//      .put(url, JSON.stringify(hero), {headers: this.headers})
//      .toPromise()
//      .then(() => hero)
//      .catch(this.handleError);
//  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
