import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tournament-panel',
  templateUrl: './tournament-panel.component.html',
  styleUrls: ['./tournament-panel.component.scss']
})
export class TournamentPanelComponent implements OnInit {
  @Input() tournamentName: string;
  @Input() season: string;

  constructor() {}

  ngOnInit() {}
}
