import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BikeDialog } from './bike-dialog';
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
import { DlgTestViewContainerDirective } from '../_helpers/dlgTestViewContainerDirective';
import { DlgTestChildViewContainerComponent } from '../_helpers/dlgTestChildViewContainerComponent';
import { MaterialModule } from 'src/material-module';

const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  BikeDialog,
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
  entryComponents: [BikeDialog],
})
class DialogTestModule {}
describe('     - Dialog - Add/Edit Bike Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<BikeDialog>;
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
    dialogRef = dialog.open(BikeDialog);
    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    expect(dialogRef.componentInstance instanceof BikeDialog).toBe(
      true,
      'Failed to open'
    );
    dialogRef.close();
    tick(500);
    fixture.detectChanges();
  }));

  it('should show titel and buttons', (done) => {
    const h2 = element.querySelector('#titelBike');
    const button = element.querySelector('#onCancelBikeD');
    const btnConfirm = element.querySelector('#onConfirmBikeD');

    expect(h2.textContent).toContain('a Bike.');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Submit');
    done();
  });

  it('should close when cancel button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelBikeD') as HTMLElement).click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });
});
