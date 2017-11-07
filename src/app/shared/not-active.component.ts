import {Component, Input} from "@angular/core";
import {Answer} from "../models/answer";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'not-active',
  templateUrl: './not-active.component.html',
  styleUrls: ['../input/input.component.css']
})
export class NotActiveComponent {
  private _answers = [];

  @Input()
  set answers(answers: Array<string>) {
    this._answers = answers;
  }

  get answers(): Array<string> {
    return this._answers;
  }
}
