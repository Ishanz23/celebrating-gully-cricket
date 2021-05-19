import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TournamentPanelComponent } from './tournament-panel.component';

describe('TournamentPanelComponent', () => {
  let component: TournamentPanelComponent;
  let fixture: ComponentFixture<TournamentPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
