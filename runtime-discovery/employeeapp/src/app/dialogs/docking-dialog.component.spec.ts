import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DockingDialog } from './';
import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';
import { MaterialModule } from 'src/material-module';
import { DlgTestChildViewContainerComponent } from '../_helpers/dlgTestChildViewContainerComponent';
import { DlgTestViewContainerDirective } from '../_helpers/dlgTestViewContainerDirective';

const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  DockingDialog,
];
@NgModule({
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NoopAnimationsModule,
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [DockingDialog],
})
class DialogTestModule {}
describe('     - Dialog - Add/Edit Docking Station Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<DockingDialog>;
  let element: HTMLElement;
  let fixture: ComponentFixture<DlgTestChildViewContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        HttpClientModule,
        FormBuilder,
        DatePipe,
        HttpClient,
        HttpHandler,
        {
          provide: OverlayContainer,
          useFactory: () => {
            element = document.createElement('div');
            return { getContainerElement: () => element };
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(inject([MatDialog], (d: MatDialog) => {
    dialog = d;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgTestChildViewContainerComponent);
    fixture.detectChanges();
    dialogRef = dialog.open(DockingDialog);
    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    expect(dialogRef.componentInstance instanceof DockingDialog).toBe(
      true,
      'Failed to open'
    );
    dialogRef.close();
    tick(500);
    fixture.detectChanges();
  }));

  it('should show titel and buttons', (done) => {
    const h2 = element.querySelector('#titelDockD');
    const button = element.querySelector('#onCancelDockD');
    const btnConfirm = element.querySelector('#onConfirmDockD');

    expect(h2.textContent).toContain('a Docking station.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
    done();
  });

  it('should hide error initialy', (done) => {
    // const mockError = 'Form is not complete.';
    // dialogRef.componentInstance.error = mockError;
    // fixture.detectChanges();
    const error = element.querySelector('#errorDockD');
    expect(error).toBeFalsy();
    done();
  });

  it('should close when cancel button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelDockD') as HTMLElement).click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });

  it('should show disabled sumbit-button if there is no name entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmDockD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="name"]')
      .parentElement as HTMLInputElement;
    const bikesInput = element.querySelector('input[formControlName="bikes"]')
      .parentElement as HTMLInputElement;
    const capacityInput = element.querySelector(
      'input[formControlName="capacity"]'
    ).parentElement as HTMLInputElement;
    const latInput = element.querySelector('input[formControlName="lat"]')
      .parentElement as HTMLInputElement;
    const lngInput = element.querySelector('input[formControlName="lng"]')
      .parentElement as HTMLInputElement;
    bikesInput.value = '3';
    bikesInput.dispatchEvent(new Event('input'));
    capacityInput.value = '5';
    capacityInput.dispatchEvent(new Event('input'));
    latInput.value = '51';
    latInput.dispatchEvent(new Event('input'));
    lngInput.value = '4';
    lngInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toBe(undefined);
      expect(bikesInput.value).toEqual('3');
      expect(capacityInput.value).toEqual('5');
      expect(latInput.value).toEqual('51');
      expect(lngInput.value).toEqual('4');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show disabled sumbit-button if there is no bikes entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmDockD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="name"]')
      .parentElement as HTMLInputElement;
    const bikesInput = element.querySelector('input[formControlName="bikes"]')
      .parentElement as HTMLInputElement;
    const capacityInput = element.querySelector(
      'input[formControlName="capacity"]'
    ).parentElement as HTMLInputElement;
    const latInput = element.querySelector('input[formControlName="lat"]')
      .parentElement as HTMLInputElement;
    const lngInput = element.querySelector('input[formControlName="lng"]')
      .parentElement as HTMLInputElement;
    nameInput.value = 'Docking';
    nameInput.dispatchEvent(new Event('input'));
    capacityInput.value = '5';
    capacityInput.dispatchEvent(new Event('input'));
    latInput.value = '51';
    latInput.dispatchEvent(new Event('input'));
    lngInput.value = '4';
    lngInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('Docking');
      expect(bikesInput.value).toBe(undefined);
      expect(capacityInput.value).toEqual('5');
      expect(latInput.value).toEqual('51');
      expect(lngInput.value).toEqual('4');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show disabled sumbit-button if there is no capacity entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmDockD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="name"]')
      .parentElement as HTMLInputElement;
    const bikesInput = element.querySelector('input[formControlName="bikes"]')
      .parentElement as HTMLInputElement;
    const capacityInput = element.querySelector(
      'input[formControlName="capacity"]'
    ).parentElement as HTMLInputElement;
    const latInput = element.querySelector('input[formControlName="lat"]')
      .parentElement as HTMLInputElement;
    const lngInput = element.querySelector('input[formControlName="lng"]')
      .parentElement as HTMLInputElement;
    nameInput.value = 'Docking';
    nameInput.dispatchEvent(new Event('input'));
    bikesInput.value = '5';
    bikesInput.dispatchEvent(new Event('input'));
    latInput.value = '51';
    latInput.dispatchEvent(new Event('input'));
    lngInput.value = '4';
    lngInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('Docking');
      expect(bikesInput.value).toEqual('5');
      expect(capacityInput.value).toBe(undefined);
      expect(latInput.value).toEqual('51');
      expect(lngInput.value).toEqual('4');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show disabled sumbit-button if there is no latitude entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmDockD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="name"]')
      .parentElement as HTMLInputElement;
    const bikesInput = element.querySelector('input[formControlName="bikes"]')
      .parentElement as HTMLInputElement;
    const capacityInput = element.querySelector(
      'input[formControlName="capacity"]'
    ).parentElement as HTMLInputElement;
    const latInput = element.querySelector('input[formControlName="lat"]')
      .parentElement as HTMLInputElement;
    const lngInput = element.querySelector('input[formControlName="lng"]')
      .parentElement as HTMLInputElement;
    nameInput.value = 'Docking';
    nameInput.dispatchEvent(new Event('input'));
    bikesInput.value = '5';
    bikesInput.dispatchEvent(new Event('input'));
    capacityInput.value = '51';
    capacityInput.dispatchEvent(new Event('input'));
    lngInput.value = '4';
    lngInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('Docking');
      expect(bikesInput.value).toEqual('5');
      expect(capacityInput.value).toEqual('51');
      expect(latInput.value).toBe(undefined);
      expect(lngInput.value).toEqual('4');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show disabled sumbit-button if there is no longitude entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmDockD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="name"]')
      .parentElement as HTMLInputElement;
    const bikesInput = element.querySelector('input[formControlName="bikes"]')
      .parentElement as HTMLInputElement;
    const capacityInput = element.querySelector(
      'input[formControlName="capacity"]'
    ).parentElement as HTMLInputElement;
    const latInput = element.querySelector('input[formControlName="lat"]')
      .parentElement as HTMLInputElement;
    const lngInput = element.querySelector('input[formControlName="lng"]')
      .parentElement as HTMLInputElement;
    nameInput.value = 'Docking';
    nameInput.dispatchEvent(new Event('input'));
    bikesInput.value = '5';
    bikesInput.dispatchEvent(new Event('input'));
    capacityInput.value = '51';
    capacityInput.dispatchEvent(new Event('input'));
    latInput.value = '4';
    latInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('Docking');
      expect(bikesInput.value).toEqual('5');
      expect(capacityInput.value).toEqual('51');
      expect(latInput.value).toEqual('4');
      expect(lngInput.value).toBe(undefined);

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show sumbit-button if the form is complete', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmDockD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="name"]')
      .parentElement as HTMLInputElement;
    const bikesInput = element.querySelector('input[formControlName="bikes"]')
      .parentElement as HTMLInputElement;
    const capacityInput = element.querySelector(
      'input[formControlName="capacity"]'
    ).parentElement as HTMLInputElement;
    const latInput = element.querySelector('input[formControlName="lat"]')
      .parentElement as HTMLInputElement;
    const lngInput = element.querySelector('input[formControlName="lng"]')
      .parentElement as HTMLInputElement;

    nameInput.value = 'Docking';
    nameInput.dispatchEvent(new Event('input'));
    bikesInput.value = '5';
    bikesInput.dispatchEvent(new Event('input'));
    capacityInput.value = '51';
    capacityInput.dispatchEvent(new Event('input'));
    latInput.value = '4';
    latInput.dispatchEvent(new Event('input'));
    lngInput.value = '6';
    lngInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('Docking');
      expect(bikesInput.value).toEqual('5');
      expect(capacityInput.value).toEqual('51');
      expect(latInput.value).toEqual('4');
      expect(lngInput.value).toEqual('6');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });
});
