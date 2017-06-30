import { InputRoutingModule } from './input-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component'


@NgModule({
  imports:      [ CommonModule, FormsModule, InputRoutingModule ],
  declarations: [ InputComponent ],
  exports:      [ InputComponent ],
  providers:    [  ]
})
export class InputModule { }
