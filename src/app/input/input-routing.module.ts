import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputComponent } from './input.component';

const routes: Routes = [
    { path: '', redirectTo: 'input', pathMatch: 'full'},
    { path: 'input', component: InputComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputRoutingModule {}
