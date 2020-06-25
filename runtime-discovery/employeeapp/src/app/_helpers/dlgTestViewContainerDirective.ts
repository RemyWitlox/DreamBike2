import { ViewContainerRef, Directive } from '@angular/core';

@Directive({ selector: 'dir-with-view-container' })
export class DlgTestViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
