import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Player } from './player'
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {
  loading = true
  deletionActive: string = null
  playersCollection: AngularFirestoreCollection<Player>
  players: Player[] = []
  subscriptions = new Subscription()

  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.playersCollection = this.afs.collection<Player>('players', ref => ref.orderBy('firstName'))
    this.subscriptions.add(
      this.playersCollection.valueChanges({ idField: 'id' }).subscribe(players => {
        this.loading = false
        this.players = players
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  modify(event: Event, player: Player) {
    this.openSnackBar(`Coming Soon!`)
  }

  confirmDelete(event: Event, player: Player) {
    this.playersCollection
      .doc(player.id)
      .delete()
      .then(done => this.openSnackBar(`Data of ${player.firstName} ${player.lastName} deleted`))
      .catch(err => this.openSnackBar(`Failed to delete data of ${player.firstName} ${player.lastName}`))
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
