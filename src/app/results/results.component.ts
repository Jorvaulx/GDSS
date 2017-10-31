import {Component, OnInit} from '@angular/core';
import {ResultsService} from "./results.service";
import {Result} from "../models/Result";

@Component({
  selector: 'app-results-panel',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  title:string = 'Results';
  results:Result;

  constructor(private resultsService: ResultsService) {
  }

  ngOnInit(): void {
    this.resultsService.getResults().then(results =>{
      this.results = results;
      console.log(this.results);
    });
  }
}
