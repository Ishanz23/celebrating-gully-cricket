import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-tournament-panel',
  templateUrl: './tournament-panel.component.html',
  styleUrls: ['./tournament-panel.component.scss']
})
export class TournamentPanelComponent implements OnInit {
  @Input() tournament: any

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToEnrollment() {
    this.router.navigate(['enroll', this.tournament.id])
  }
}
