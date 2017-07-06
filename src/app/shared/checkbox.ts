import { Component, Input } from '@angular/core';

import { InputComponent } from './input.component';

@Component({
  templateUrl: './checkbox.html'
})
export class HeroJobAdComponent implements InputComponent {
  @Input() data: any;

}
