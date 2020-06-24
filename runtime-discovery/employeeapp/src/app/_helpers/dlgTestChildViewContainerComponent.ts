import { Component, ViewChild } from '@angular/core';
import { DlgTestViewContainerDirective } from './dlgTestViewContainerDirective';

@Component({
  selector: 'lpa-arbitrary-component',
  template: `<dir-with-view-container></dir-with-view-container>`,
})
export class DlgTestChildViewContainerComponent {
  @ViewChild(DlgTestViewContainerDirective)
  childWithViewContainer: DlgTestViewContainerDirective;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}
