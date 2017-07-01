import { Component } from '@angular/core';
import { InputService } from './input.service';

@Component({
  selector: 'app-instuctions-panel',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [InputService]
})
export class InputComponent {
  title = 'Input';
  constructor(private inputService: InputService) {}
}
