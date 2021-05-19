import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Player } from './player'
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar'
import { Observable, Subscription } from 'rxjs'
import { environment } from 'src/environments/environment'
import { LoaderService } from 'src/app/services/loader.service'
import { first, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  providers: [LoaderService],
})
export class PlayersComponent implements OnInit, OnDestroy {
  loading = true
  playersCollection: AngularFirestoreCollection<Player>
  deletionActive: string = null
  players$: Observable<Player[]>

  constructor(private afs: AngularFirestore, private _snackBar: MatSnackBar, public loaderService: LoaderService) {}

  ngOnInit() {
    this.playersCollection = this.afs.collection<Player>('players', (ref) => ref.orderBy('firstName'))
    this.players$ = this.loaderService
      .showLoaderUntilCompleted(this.playersCollection.valueChanges({ idField: 'id' }).pipe(first()))
      .pipe(startWith([]))
  }

  ngOnDestroy() {}

  modify(event: Event, player: Player) {
    this.openSnackBar(`Coming Soon!`)
  }

  confirmDelete(event: Event, player: Player) {
    if (environment.production) {
      this.openSnackBar(`Contact the admin`)
    } else {
      player.tournaments.forEach((tournament) => {
        tournament.get().then((doc) => {
          if (doc.exists) {
            const players = doc.data().players
            tournament.update({
              players: players.filter((playerRef) => playerRef.player.id !== player.id),
            })
          }
        })
      })
      this.playersCollection
        .doc(player.id)
        .delete()
        .then((done) => {
          this.openSnackBar(`Data of ${player.firstName} ${player.lastName} deleted`)
        })
        .catch((err) => {
          console.error(err)
          this.openSnackBar(`Failed to delete data of ${player.firstName} ${player.lastName}`)
        })
    }
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
      horizontalPosition,
    })
  }
}
