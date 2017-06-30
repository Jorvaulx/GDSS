import { InstructionsComponent } from './instructions.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [RouterModule.forChild([
    { path: 'instructions', component: InstructionsComponent }
  ])],
  exports: [RouterModule]
})
export class InstructionsRoutingModule {}
