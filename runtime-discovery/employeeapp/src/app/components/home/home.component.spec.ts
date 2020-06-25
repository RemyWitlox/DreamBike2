import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { By } from '@angular/platform-browser';
import { ReceiveUser, Role } from 'src/app/models';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let de: DebugElement;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUser: ReceiveUser = {
    name: 'User',
    username: 'Username',
    role: Role.Admin,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, AppRoutingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance; // The component instantiation
    de = fixture.debugElement;

    component.currentBackendUser = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert user when not logged in', () => {
    component.currentBackendUser = null;
    fixture.detectChanges();
    const titleElement = de.query(By.css('#homeNoUserTxt')).nativeElement;
    expect(titleElement.textContent).toContain(
      'You are not logged in. Please log in to continue.'
    );
  });

  it('should say Welcome to loged in user', () => {
    const titleElement = de.query(By.css('#welcome')).nativeElement;
    const roleTxt = de.query(By.css('#roleTxt')).nativeElement;
    expect(titleElement.textContent).toContain('Welcome');
    expect(titleElement.textContent).toContain(mockUser.name);
    expect(roleTxt.textContent).toContain('Your current role is');
    expect(roleTxt.textContent).toContain(mockUser.role);
    expect(roleTxt.textContent).toContain("Now let's get started!");
  });

  it('should show 3 tiles', () => {
    const tiles = de.queryAll(By.css('mat-grid-tile'));
    expect(tiles.length).toBe(3);
    expect(tiles[0].nativeElement.textContent).toContain('Docking Stations');
    expect(tiles[1].nativeElement.textContent).toContain('Bikes');
    expect(tiles[2].nativeElement.textContent).toContain('Repairs');
  });

  it('should go to Docking Stations on clicking the button', () => {
    fixture.detectChanges();
    spyOn(component, 'goDocking');
    const btn = de.query(By.css('#goDocking')).nativeElement;
    btn.click();
    expect(component.goDocking).toHaveBeenCalled();
  });

  it('should go to Bikes on clicking the button', () => {
    fixture.detectChanges();
    spyOn(component, 'goBikes');
    const btn = de.query(By.css('#goBikes')).nativeElement;
    btn.click();
    expect(component.goBikes).toHaveBeenCalled();
  });

  it('should go to Repairs on clicking the button', () => {
    fixture.detectChanges();
    spyOn(component, 'goRepairs');
    const btn = de.query(By.css('#goRepairs')).nativeElement;
    btn.click();
    expect(component.goRepairs).toHaveBeenCalled();
  });
});
