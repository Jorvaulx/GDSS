import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: 'instructions', pathMatch: 'full' },
  { path: 'results',  loadChildren: 'app/results/results.module#ResultsModule' },
  { path: 'input',  loadChildren: 'app/input/input.module#InputModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
