import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LoginDialog } from './';
import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  tick,
  async,
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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/material-module';
import { DlgTestViewContainerDirective } from '../_helpers/dlgTestViewContainerDirective';
import { DlgTestChildViewContainerComponent } from '../_helpers/dlgTestChildViewContainerComponent';

const TEST_DIRECTIVES = [
  DlgTestViewContainerDirective,
  DlgTestChildViewContainerComponent,
  LoginDialog,
];

@NgModule({
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NoopAnimationsModule,
    RouterTestingModule,
    RouterModule,
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [LoginDialog],
})
class DialogTestModule {}
describe('     - Dialog - Login Dialog', () => {
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<LoginDialog>;
  let element: HTMLElement;
  let fixture: ComponentFixture<DlgTestChildViewContainerComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DialogTestModule],
      providers: [
        HttpClientModule,
        FormBuilder,
        DatePipe,
        HttpClient,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
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
  }));

  beforeEach(inject([MatDialog], (d: MatDialog) => {
    dialog = d;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgTestChildViewContainerComponent);
    fixture.detectChanges();
    dialogRef = dialog.open(LoginDialog);
    fixture.detectChanges();
  });

  it('should be created', fakeAsync(() => {
    expect(dialogRef.componentInstance instanceof LoginDialog).toBe(
      true,
      'Failed to open'
    );
    dialogRef.close();
    tick(500);
    fixture.detectChanges();
  }));

  it('should show titel and buttons', (done) => {
    const h2 = element.querySelector('#titelLogin');
    const button = element.querySelector('#onCancelLoginD');
    const btnConfirm = element.querySelector('#onConfirmLoginD');

    expect(h2.textContent).toContain('Login');
    expect(button.textContent).toContain('Cancel');
    expect(btnConfirm.textContent).toContain('Login');
    done();
  });

  it('should hide error initialy', (done) => {
    const error = element.querySelector('#errorLoginD');
    expect(error).toBeFalsy();
    done();
  });

  it('should close when cancel button pressed', (done) => {
    const afterCloseCallback = jasmine.createSpy('afterClose callback');

    dialogRef.afterClosed().subscribe(afterCloseCallback);
    (element.querySelector('#onCancelLoginD') as HTMLElement).click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(element.querySelector('mat-dialog-container')).toBeNull(
        'Dialog box still open'
      );
      expect(afterCloseCallback).toHaveBeenCalled();
    });
    done();
  });

  it('should show disabled login-button if there is no password entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="username"]')
      .parentElement as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formControlName="password"]'
    ).parentElement as HTMLInputElement;
    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(nameInput.value).toEqual('ABC');
      expect(passwordInput.value).toBe(undefined);

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show disabled login-button if there is no login entry', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector('input[formControlName="username"]')
      .parentElement as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formControlName="password"]'
    ).parentElement as HTMLInputElement;
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(nameInput.value).toEqual(undefined);
      expect(passwordInput.value).toBe('123');

      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('true');
    });
    done();
  });

  it('should show login-button if the entries are valid', (done) => {
    fixture.detectChanges();
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector(
      'input[formControlName="username"]'
    ) as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formControlName="password"]'
    ) as HTMLInputElement;

    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('ABC');
      expect(passwordInput.value).toEqual('123');
      expect(submitBtn.getAttribute('ng-reflect-disabled')).toBe('false');
    });
    done();
  });

  it('should login when login button pressed', (done) => {
    fixture.detectChanges();
    spyOn(dialogRef.componentInstance, 'onConfirm');
    const submitBtn = element.querySelector(
      '#onConfirmLoginD'
    ) as HTMLButtonElement;
    const nameInput = element.querySelector(
      'input[formControlName="username"]'
    ) as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[formControlName="password"]'
    ) as HTMLInputElement;

    nameInput.value = 'ABC';
    nameInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(nameInput.value).toEqual('ABC');
      expect(passwordInput.value).toEqual('123');
      (element.querySelector('#onConfirmDeleteD') as HTMLElement).click();
      expect(dialogRef.componentInstance.onConfirm).toHaveBeenCalled();
    });
    done();
  });
});
