import { AppComponent } from './app.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { Role, ReceiveUser } from 'src/app/models';
import { DebugElement } from '@angular/core';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true }),
    };
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let de: DebugElement;
  let fixture: ComponentFixture<AppComponent>;
  let mockUserAdmin: ReceiveUser = {
    name: 'testUser',
    username: 'Test user',
    role: Role.Admin,
  };
  let mockUserManager: ReceiveUser = {
    name: 'testUser',
    username: 'Test user',
    role: Role.Management,
  };
  let mockUserEmployee: ReceiveUser = {
    name: 'testUser',
    username: 'Test user',
    role: Role.Employee,
  };

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FlexLayoutModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  beforeEach(async () => {
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create the app', (done) => {
    expect(component).toBeTruthy();
    done();
  });

  it('should have a titel and subtitle', (done) => {
    // * arrange
    component.connected = true;
    component.loading = false;
    fixture.detectChanges();
    const titleElement = de.query(By.css('h1')).nativeElement;
    const subtitleElement = de.query(By.css('span')).nativeElement;
    expect(titleElement.textContent).toContain('Dreambike');
    expect(subtitleElement.textContent).toContain(
      'DreamBike Employee Application'
    );
    done();
  });

  it('should have a horizontal menu with login if not loged in', (done) => {
    // * act
    component.connected = true;
    component.loading = false;
    component.currentBackendUser = null;
    fixture.detectChanges();
    // * arrange
    const menu = de.queryAll(By.css('#horizontalMenu ul li'));
    // * assert
    expect(menu[0].nativeElement.innerText).toContain('Login', 'login');
    expect(menu[1].nativeElement.innerText).toContain('Home', 'home');
    expect(menu[2].nativeElement.innerText).toContain('Dashboard', 'dash');
    expect(menu[3]).toBe(undefined);
    done();
  });

  it('should have a horizontal menu with logout if loged in', (done) => {
    // * act
    component.connected = true;
    component.loading = false;
    component.currentBackendUser = mockUserAdmin;
    fixture.detectChanges();
    // * arrange
    const menu = de.queryAll(By.css('#horizontalMenu ul li'));
    // * assert
    expect(menu[0].nativeElement.innerText).toContain('Home', 'home');
    expect(menu[1].nativeElement.innerText).toContain('Dashboard', 'dash');
    expect(menu[2].nativeElement.innerText).toContain('LogOut', 'logout');
    expect(menu[3]).toBe(undefined);
    done();
  });

  it('should have a vertical menu with all options when loged in as Admin', (done) => {
    component.currentBackendUser = mockUserAdmin;
    component.connected = true;
    component.loading = false;
    fixture.detectChanges();
    const menu = de.queryAll(By.css('#verticalMenu a'));
    fixture.detectChanges();
    expect(menu[0].nativeElement.innerText).toContain('Home');
    expect(menu[1].nativeElement.innerText).toContain('Docking Stations');
    expect(menu[2].nativeElement.innerText).toContain('Bikes');
    expect(menu[3].nativeElement.innerText).toContain('Repairs');
    expect(menu[4].nativeElement.innerText).toContain('Analytics');
    expect(menu[5].nativeElement.innerText).toContain('Settings');

    done();
  });

  it('should have a vertical menu without settings or analytics when loged in as Employee', (done) => {
    component.currentBackendUser = mockUserEmployee;
    component.connected = true;
    component.loading = false;
    fixture.detectChanges();
    const menu = de.queryAll(By.css('#verticalMenu a'));
    expect(menu[0].nativeElement.innerText).toContain('Home');
    expect(menu[1].nativeElement.innerText).toContain('Docking Stations');
    expect(menu[2].nativeElement.innerText).toContain('Bikes');
    expect(menu[3].nativeElement.innerText).toContain('Repairs');
    expect(menu[4]).toBe(undefined);
    expect(menu[5]).toBe(undefined);
    done();
  });
  it('should have a vertical menu without analytics when loged in as Manager', (done) => {
    component.currentBackendUser = mockUserManager;
    component.connected = true;
    component.loading = false;
    fixture.detectChanges();
    const menu = de.queryAll(By.css('#verticalMenu a'));
    expect(menu[0].nativeElement.innerText).toContain('Home');
    expect(menu[1].nativeElement.innerText).toContain('Docking Stations');
    expect(menu[2].nativeElement.innerText).toContain('Bikes');
    expect(menu[3].nativeElement.innerText).toContain('Repairs');
    expect(menu[4].nativeElement.innerText).toContain('Analytics');
    expect(menu[5]).toBe(undefined);
    done();
  });

  it('should have a progress bar and text when loading', (done) => {
    component.currentBackendUser = null;
    component.connected = false;
    component.loading = true;
    fixture.detectChanges();
    const el = de.query(By.css('mat-progress-bar')).nativeElement;
    const txt = de.query(By.css('#appLoadTxt')).nativeElement;
    fixture.detectChanges();
    expect(el).toBeTruthy();
    expect(txt.textContent).toContain('Loading,... Please wait.');
    done();
  });

  it('should show a message when connection has failed', (done) => {
    component.currentBackendUser = null;
    component.connected = false;
    component.loading = false;
    fixture.detectChanges();
    const el = de.query(By.css('#conErr')).nativeElement;
    fixture.detectChanges();
    expect(el).toBeTruthy();
    expect(el.textContent).toContain(
      'There is no connection with the database, please contact the IT crowd!'
    );
    done();
  });

  it('should have a router-outlet when connection is available', (done) => {
    component.currentBackendUser = null;
    component.connected = true;
    component.loading = false;
    fixture.detectChanges();
    const el = de.query(By.css('router-outlet')).nativeElement;
    fixture.detectChanges();
    expect(el).toBeTruthy();
    done();
  });

  it('should open the Login dialog', (done) => {
    component.connected = true;
    component.loading = false;
    component.currentBackendUser = null;
    fixture.detectChanges();
    spyOn(component, 'onLogin');
    const btn = de.query(By.css('#onLoginApp')).nativeElement;
    btn.click();
    expect(component.onLogin).toHaveBeenCalled();
    done();
  });

  it('should logout a user when logout button pressed', (done) => {
    component.connected = true;
    component.loading = false;
    component.currentBackendUser = mockUserAdmin;
    fixture.detectChanges();
    spyOn(component, 'onLogout');
    const btn = de.query(By.css('#onLogoutApp')).nativeElement;
    btn.click();
    expect(component.onLogout).toHaveBeenCalled();
    done();
  });
});
