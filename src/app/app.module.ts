import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoolStorageModule } from 'angular2-cool-storage'

/* App Root */
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Feature Modules */
import { InstructionsModule } from './instructions/instructions.module';

/* Routing Module */
import { AppRoutingModule  } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InstructionsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CoolStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
