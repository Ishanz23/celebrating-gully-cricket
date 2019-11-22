import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-tournament-panel',
  templateUrl: './tournament-panel.component.html',
  styleUrls: ['./tournament-panel.component.scss']
})
export class TournamentPanelComponent implements OnInit {
  @Input() tournament: any

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {}

  navigate(event: Event, path: string) {
    this.router.navigate([path, this.tournament.id])
  }

  showComingSoon() {
    this.openSnackBar('Feature Coming Soon!')
  }

  private openSnackBar(
    message: string,
    action: string = '',
    duration: number = 2000,
    panelClass = 'accent',
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'
  ) {
    this._snackBar.open(message, action, {
      duration,
      panelClass,
      verticalPosition,
      horizontalPosition
    })
  }
}
