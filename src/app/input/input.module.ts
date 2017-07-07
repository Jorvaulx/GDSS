import { InputRoutingModule } from './input-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { CheckboxComponent } from '../shared/checkbox.component';
import { QuestionContainerComponent } from '../shared/question-container.component';


@NgModule({
  imports:      [ CommonModule, FormsModule, InputRoutingModule ],
  declarations: [ InputComponent,
                  QuestionContainerComponent ],
  exports:      [ InputComponent ],
  providers:    [  ]
})
export class InputModule { }
