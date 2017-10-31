import {Component, OnInit} from '@angular/core';
import {ResultsService} from "./results/results.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Geophysical Decision Support System (GDSS)';


  constructor() {
  }

  ngOnInit():void {
    console.log('onInit App');
  }
}
