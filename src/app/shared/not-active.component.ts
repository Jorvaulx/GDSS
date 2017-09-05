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
    let localArray = [];
    // if (answers) {
    //   console.log("answers forEach begin");
    //   answers.forEach(function (answer) {
    //     localArray.push(answer);
    //   });
    //
    //   console.log("answers forEach end");
    // }
    this._answers = localArray;
  }

  get answers(): Array<string> {
    return this._answers;
  }
}
