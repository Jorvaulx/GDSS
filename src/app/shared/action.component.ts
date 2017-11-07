import {Component, Input} from "@angular/core";
import {Question} from "../models/question";

@Component({
  selector: 'action',
  templateUrl: './action.component.html',
  styleUrls: ['../input/input.component.css']
})
export class ActionComponent  {
  @Input() question: Question;

  constructor() { }

}
