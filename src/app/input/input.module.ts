import {InputRoutingModule} from './input-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputComponent} from './input.component';
import {QuestionContainerComponent} from '../shared/question-container.component';
import {NavigationComponent} from '../shared/navigation.component';
import {HelpContainerComponent} from '../shared/help-container.component';
import {CheckboxComponent} from '../shared/checkbox.component';
import {RadioComponent} from '../shared/radio.component';
import {TextComponent} from '../shared/text.component';
import {QuestionDirective} from '../shared/question.directive';
import {NotActiveComponent} from "../shared/not-active.component";
import {DisplayQuestionComponent} from "../shared/display-questions.component";
import {ActionComponent} from "../shared/action.component";


@NgModule({
  imports: [CommonModule,
    FormsModule,
    InputRoutingModule,
    ReactiveFormsModule],
  declarations: [InputComponent,
    QuestionContainerComponent,
    HelpContainerComponent,
    RadioComponent,
    CheckboxComponent,
    TextComponent,
    QuestionDirective,
    NavigationComponent,
    NotActiveComponent,
    DisplayQuestionComponent,
    ActionComponent],
  exports: [InputComponent],
  entryComponents: [CheckboxComponent, RadioComponent, TextComponent, NotActiveComponent],
  providers: []
})
export class InputModule {
}
