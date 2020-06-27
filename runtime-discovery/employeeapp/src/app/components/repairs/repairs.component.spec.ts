import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsComponent } from './repairs.component';

describe('RepairsComponent    <----    Under Construction    --->', () => {
  let component: RepairsComponent;
  let fixture: ComponentFixture<RepairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepairsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be under construction', () => {
    expect(component.message).toContain('under construction');
  });
});
