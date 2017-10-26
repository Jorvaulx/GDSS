import {Component, OnInit} from '@angular/core';
import {KeywordService} from "./input/keyword.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Geophysical Decision Support System (GDSS)';


  constructor(private keywordService: KeywordService) {
  }

  ngOnInit():void {
    console.log('onInit App');
    this.keywordService.getKeywordFile();
  }
}
