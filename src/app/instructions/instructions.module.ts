import { InstructionsRoutingModule } from './instructions-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InstructionsComponent } from './instructions.component'


@NgModule({
  imports:      [ CommonModule, FormsModule, InstructionsRoutingModule ],
  declarations: [ InstructionsComponent ],
  exports:      [ InstructionsComponent ],
  providers:    [  ]
})
export class InstructionsModule { }
