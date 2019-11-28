import { Component, OnInit } from '@angular/core'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Player } from '../../players/player'
import { Subscription } from 'rxjs'
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { Tournamnent } from '../tournament.model'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  tournament_id: string
  tournament: Tournamnent
  tournamentDocument: AngularFirestoreDocument<any>
  loading = true
  deletionActive: string = null
  playersCollection: AngularFirestoreCollection<Player>
  players: Player[] = []
  subscriptions = new Subscription()

  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.tournament_id = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentDocument = this.afs.doc(`tournaments/${this.tournament_id}`)
    this.subscriptions.add(
      this.tournamentDocument.valueChanges().subscribe(tournament => {
        this.tournament = { id: this.tournament_id, ...tournament }
        this.tournament.players.forEach(player => {
          player.player
            .get()
            .then(doc => {
              if (doc.exists) {
                this.players.push({ id: doc.id, votes: player.votes, ...(doc.data() as Player) })
              }
            })
            .finally(() => (this.loading = false))
        })
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  modify(event: Event, player: Player) {
    this.openSnackBar(`Coming Soon!`)
  }

  confirmLeave(event: Event, player: Player) {
    this.openSnackBar(`Contact the admin!`)
    // player.tournaments.forEach(tournament => {
    //   tournament.get().then(doc => {
    //     if (doc.exists) {
    //       const players = doc.data().players
    //       tournament.update({
    //         players: players.filter(playerRef => playerRef.player.id !== player.id)
    //       })
    //     }
    //   })
    // })
    // this.playersCollection
    //   .doc(player.id)
    //   .delete()
    //   .then(done => {
    //     this.openSnackBar(`Data of ${player.firstName} ${player.lastName} deleted`)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //     this.openSnackBar(`Failed to delete data of ${player.firstName} ${player.lastName}`)
    //   })
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
