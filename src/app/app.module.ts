import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LockerModule, Locker, LockerConfig} from 'angular-safeguard'

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
    LockerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private locker: Locker) {}
}
