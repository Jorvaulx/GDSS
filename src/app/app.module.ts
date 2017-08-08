import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {CoolStorageModule} from 'angular2-cool-storage';

/* App Root */
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/* Feature Modules */
import {InstructionsModule} from './instructions/instructions.module';

/* Routing Module */
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InstructionsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CoolStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
