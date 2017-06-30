import { Component, ViewChild, AfterViewInit, ElementRef, Input, OnInit } from '@angular/core';
import { Locker } from 'angular-safeguard'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instuctions-panel',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  title = 'Instructions';
  closeResult: string;
  templateRef: ElementRef;


  constructor(
    private modalService: NgbModal,
    private locker: Locker
  ) {}

  @ViewChild('content')
  set content(ref: any) {
    console.log(ref);
    if (!this.locker.has('disclaimer') || this.locker.get('disclaimer')!==true) {
      this.open(ref);
    }
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      if (result==='Agree') {
        this.locker.set('disclaimer',true);
      }
      this.closeResult = `Closed with: ${result}`;
      console.log('Closed', this.closeResult);
    }, (reason) => {
      console.log('reason', reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('Dismissed', this.closeResult);
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
