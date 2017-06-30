import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResultsComponent } from './results.component'
import { ResultsRoutingModule } from './results-routing.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ResultsRoutingModule ],
  declarations: [ ResultsComponent ],
  exports:      [ ResultsComponent ],
  providers:    [  ]
})
export class ResultsModule { }
