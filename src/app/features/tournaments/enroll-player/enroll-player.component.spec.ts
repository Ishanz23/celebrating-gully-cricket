import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollPlayerComponent } from './enroll-player.component';

describe('EnrollPlayerComponent', () => {
  let component: EnrollPlayerComponent;
  let fixture: ComponentFixture<EnrollPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
