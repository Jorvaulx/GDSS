import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { QuestionDirective } from './question.directive';
import { QuestionItem } from './question-item';
import { QuestionComponent } from './question.component';

@Component({
  selector:'question-container',
  templateUrl:'./question-container.component.html'
})

export class QuestionContainerComponent implements AfterViewInit, OnDestroy {
  @Input() question: QuestionItem;
  @ViewChild(QuestionDirective) inputHost: QuestionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
  }

  loadComponent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.question.component);

    const viewContainerRef = this.inputHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<QuestionComponent>componentRef.instance).data = this.question.data;
  }

}
