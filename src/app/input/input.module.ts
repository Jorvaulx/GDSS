import { InputRoutingModule } from './input-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { QuestionContainerComponent } from '../shared/question-container.component';
import { CheckboxComponent } from '../shared/checkbox.component';
import { RadioComponent } from '../shared/radio.component';
import { TextComponent } from '../shared/text.component';
import { QuestionDirective } from '../shared/question.directive';


@NgModule({
  imports:      [ CommonModule, FormsModule, InputRoutingModule ],
  declarations: [ InputComponent,
                  QuestionContainerComponent,
                  RadioComponent,
                  CheckboxComponent,
                  TextComponent,
                  QuestionDirective ],
  exports:      [ InputComponent ],
  entryComponents: [ CheckboxComponent, RadioComponent, TextComponent ],
  providers:    [  ]
})
export class InputModule { }
