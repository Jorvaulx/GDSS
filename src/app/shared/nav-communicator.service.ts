import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NavCommunicatorService {

  // Child Question - show
  private confirmNavigation = new Subject<boolean>();

  private clear = new Subject<boolean>();


  confirmNavigation$ = this.confirmNavigation.asObservable();
  clear$ = this.clear.asObservable();

  // Service Calls
  processClick(value:boolean) {
    this.confirmNavigation.next(value);
  }

  clearQuestion(value:boolean) {
    this.clear.next(value);
  }

}
