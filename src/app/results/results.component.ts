import {Component, OnInit} from '@angular/core';
import {KeywordService} from "../input/keyword.service";

@Component({
  selector: 'app-results-panel',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  title = 'Results';

  constructor(private keywordService: KeywordService) {
  }

  ngOnInit(): void {
    var data = this.keywordService.getKeywordFile()
    console.log(data)
  }
}
