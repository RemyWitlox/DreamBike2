import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DeleteDialog } from './';
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

const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  DeleteDialog,
];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [DeleteDialog],
})
class DialogTestModule {}
describe('     - Dialog - Delete Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<DeleteDialog>;
  let element: HTMLElement;
  let fixture: ComponentFixture<DlgTestChildViewContainerComponent>;
  let mockData = { id: 1, name: 'Testobject' };

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
    dialogRef = dialog.open(DeleteDialog);
    dialogRef.componentInstance.data = mockData;
    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    expect(dialogRef.componentInstance instanceof DeleteDialog).toBe(
      true,
      'Failed to open'
    );
    dialogRef.close();
    tick(500);
    fixture.detectChanges();
  }));

  it('should show titel, text and buttons', (done) => {
    const h1 = element.querySelector('#titelDeleteD');
    const p = element.querySelector('#textDeleteD');
    const button = element.querySelector('#onCancelDeleteD');
    const btnConfirm = element.querySelector('#onConfirmDeleteD');

    expect(h1.textContent).toContain('Delete ' + mockData.name);
    expect(p.textContent).toContain(
      'Are you sure you want to delete ' + mockData.name
    );
    expect(button.textContent).toContain('No');
    expect(btnConfirm.textContent).toContain('Yes');
    done();
  });

  it('should close when No button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelDeleteD') as HTMLElement).click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });

  it('should delete when Yes button pressed', (done) => {
    fixture.detectChanges();
    spyOn(dialogRef.componentInstance, 'onConfirm');
    (element.querySelector('#onConfirmDeleteD') as HTMLElement).click();
    expect(dialogRef.componentInstance.onConfirm).toHaveBeenCalled();
    done();
  });
});
