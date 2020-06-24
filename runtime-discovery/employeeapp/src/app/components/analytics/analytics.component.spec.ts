import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';

describe('AnalyticsComponent    <----    Under Construction    --->', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComponent);
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
