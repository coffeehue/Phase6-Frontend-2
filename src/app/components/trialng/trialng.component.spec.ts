import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialngComponent } from './trialng.component';

describe('TrialngComponent', () => {
  let component: TrialngComponent;
  let fixture: ComponentFixture<TrialngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
