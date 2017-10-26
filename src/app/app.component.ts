import {Component, OnInit} from '@angular/core';
import {ResultsService} from "./input/results.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Geophysical Decision Support System (GDSS)';


  constructor(private resultsService: ResultsService) {
  }

  ngOnInit():void {
    console.log('onInit App');
    this.resultsService.getKeywordFile();
  }
}
