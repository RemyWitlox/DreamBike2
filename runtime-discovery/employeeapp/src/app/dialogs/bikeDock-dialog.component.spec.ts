import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BikeDockDialog } from './';
import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';
import { DlgTestViewContainerDirective } from '../_helpers/dlgTestViewContainerDirective';
import { DlgTestChildViewContainerComponent } from '../_helpers/dlgTestChildViewContainerComponent';
import { Bike, BikeType, BikeDriver } from '../models';
import { By } from '@angular/platform-browser';

const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  BikeDockDialog,
];
@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [BikeDockDialog],
})
class DialogTestModule {}
describe('     - Dialog - Add/Edit Docking Station on Bike Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<BikeDockDialog>;
  let element: HTMLElement;
  let fixture: ComponentFixture<DlgTestChildViewContainerComponent>;
  let mockData: Bike = {
    bikeId: 1,
    name: 'Testbike',
    type: BikeType.ELECTRIC,
    driver: BikeDriver.FEMALE,
    size: 24,
    created: new Date('2019-07-06'),
    broken: false,
  };

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
    dialogRef = dialog.open(BikeDockDialog);
    dialogRef.componentInstance.data = mockData;
    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    expect(dialogRef.componentInstance instanceof BikeDockDialog).toBe(
      true,
      'Failed to open'
    );
    dialogRef.close();
    tick(500);
    fixture.detectChanges();
  }));

  it('should show titel and buttons', (done) => {
    const h1 = element.querySelector('#titelBikeDockD');
    const button = element.querySelector('#onCancelBikeDockD');
    const btnConfirm = element.querySelector('#onConfirmBikeDockD');

    expect(h1.textContent).toContain('Change the Docking Station.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
    done();
  });

  it('should hide error initialy', (done) => {
    const error = element.querySelector('#errorBikeDockD');
    expect(error).toBeFalsy();
    done();
  });

  it('should close when cancel button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelBikeDockD') as HTMLElement).click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });
});
