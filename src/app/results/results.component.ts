import {Component, OnInit} from '@angular/core';
import {ResultsService} from "../input/results.service";
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
    this.results = this.resultsService.getResults();
    console.log(this.results)
  }
}
