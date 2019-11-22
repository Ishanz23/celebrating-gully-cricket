import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { FormControl, FormBuilder, Validators } from '@angular/forms'
import * as firebase from 'firebase'
import { Player } from '../../players/player'
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-enroll-player',
  templateUrl: './enroll-player.component.html',
  styleUrls: ['./enroll-player.component.scss']
})
export class EnrollPlayerComponent implements OnInit {
  playersCollection: AngularFirestoreCollection<Player>
  tournament_id: string
  tournament: any
  tournamentDocument: AngularFirestoreDocument<any>
  searchText = new FormControl()
  registeredPlayerPin = new FormControl()
  players: Player[]
  is_enrolled = false
  playerType: 'none' | 'new' | 'registered' = 'none'
  registeredPlayerForm = this.fb.group({
    player: [null, Validators.required],
    pin: ['', [Validators.required, Validators.maxLength(4)]],
    captaincy: [false]
  })
  newPlayerForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null],
    nickName: [null],
    address: [null],
    mobile: [null, [Validators.required, Validators.maxLength(10)]],
    yearOfBirth: [null, [Validators.required, Validators.maxLength(4)]],
    pin: [null, [Validators.required, Validators.maxLength(4)]],
    battingOrientation: ['right'],
    bowlingOrientation: ['right'],
    specialization: ['all-rounder'],
    captaincy: [false]
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tournament_id = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentDocument = this.afs.doc(`tournaments/${this.tournament_id}`)
    this.tournamentDocument.valueChanges().subscribe(tournament => {
      this.tournament = { id: this.tournament_id, ...tournament }
    })
    this.playersCollection = this.afs.collection<Player>('players', ref => ref.orderBy('firstName'))
    this.playersCollection.valueChanges({ idField: 'id' }).subscribe(players => {
      this.players = players
    })
  }
  displayFn(player?: Player): string | undefined {
    return player ? player.firstName + ' ' + player.lastName : undefined
  }

  enroll(event: Event, newPlayer = false) {
    if (newPlayer) {
      console.log(this.newPlayerForm.value)
      if (this.newPlayerForm.valid) {
        this.afs
          .collection('players', ref => ref.where('mobile', '==', this.newPlayerForm.controls.mobile.value))
          .valueChanges()
          .subscribe(players => {
            if (players && players.length > 0) {
              this.openSnackBar('Mobile number already exists', 'Error!')
            } else {
              this.playersCollection
                .add({
                  ...this.newPlayerForm.value,
                  career: {
                    ballsBowled: 0,
                    ballsFaced: 0,
                    battingAverage: 0,
                    bestBowlingFigures: { runs: 0, wickets: 0 },
                    catches: 0,
                    economy: 0,
                    highestScore: 0,
                    innings: 0,
                    matches: 0,
                    notOuts: 0,
                    runs: 0,
                    runsConceded: 0,
                    strikeRate: 0,
                    stumpings: 0,
                    wickets: 0
                  },
                  tournaments: [this.afs.doc(`tournaments/${this.tournament_id}`).ref]
                })
                .then(data => {
                  console.log(data.id)
                  this.tournamentDocument
                    .update({
                      players: firebase.firestore.FieldValue.arrayUnion({
                        player: this.playersCollection.doc(data.id).ref,
                        isNominated: this.newPlayerForm.value.captaincy,
                        count: 0
                      })
                    })
                    .then(data => {
                      this.openSnackBar(
                        this.newPlayerForm.value.firstName + ' ' + this.newPlayerForm.value.lastName,
                        'Enrolled!'
                      )
                      this.newPlayerForm.reset()
                    })
                })
                .catch(err => this.openSnackBar(err, 'Error!'))
            }
          })
      } else {
        this.openSnackBar('Data you entered is incorrect', 'Invalid')
      }
    } else {
      console.log(this.registeredPlayerForm.value)
      if (
        this.registeredPlayerForm.valid &&
        this.registeredPlayerForm.value.player.pin === this.registeredPlayerForm.value.pin
      ) {
        this.tournamentDocument.get().subscribe(doc => {
          if (doc.exists) {
            const tournament = doc.data()
            const does_player_exist = tournament.players.find(
              player => player.player.id == this.registeredPlayerForm.value.player.id
            )
            if (!does_player_exist) {
              this.tournamentDocument
                .update({
                  players: firebase.firestore.FieldValue.arrayUnion({
                    player: this.playersCollection.doc(this.registeredPlayerForm.value.player.id).ref,
                    isNominated: this.registeredPlayerForm.value.captaincy,
                    count: 0
                  })
                })
                .then(data => {
                  this.openSnackBar(
                    this.registeredPlayerForm.value.player.firstName +
                      ' ' +
                      this.registeredPlayerForm.value.player.lastName,
                    'Enrolled!'
                  )
                })
                .catch(err => this.openSnackBar(err, 'Error!'))
            } else {
              this.openSnackBar('Player already enrolled!', '')
            }
          }
        })
      } else {
        this.openSnackBar('Incorrect pin', 'Error!')
      }
    }
    this.is_enrolled = true
  }

  reset(event: Event, newPlayer = false) {
    if (newPlayer) {
      this.newPlayerForm.reset()
    } else {
      this.registeredPlayerForm.reset()
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
      horizontalPosition
    })
  }
}
