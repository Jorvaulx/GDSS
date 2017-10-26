import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ResultsComponent } from './results.component'
import { ResultsRoutingModule } from './results-routing.module';


@NgModule({
  imports:      [ CommonModule, FormsModule, ResultsRoutingModule,NgbModule.forRoot() ],
  declarations: [ ResultsComponent ],
  exports:      [ ResultsComponent ],
  providers:    [  ]
})
export class ResultsModule { }
