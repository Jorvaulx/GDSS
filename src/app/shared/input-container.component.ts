import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { InputDirective } from './input.directive';
import { InputItem } from './input-item';
import { InputComponent } from './input.component';

export class InputContainerComponent implements AfterViewInit, OnDestroy {
  @Input() input: InputItem;
  @ViewChild(InputDirective) inputHost: InputDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
  }

  loadComponent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.input.component);

    const viewContainerRef = this.inputHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<InputComponent>componentRef.instance).data = this.input.data;
  }

}
