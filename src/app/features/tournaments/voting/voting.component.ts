import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import * as firebase from 'firebase'
import { Player } from '../../players/player'
import { Subscription } from 'rxjs'
import { Tournamnent, TournamentPlayer } from '../tournament.model'
import { FormBuilder, Validators } from '@angular/forms'
import { trigger, state, transition, style, animate } from '@angular/animations'

export interface Candidate extends Player {
  count: number
  selected: boolean
  isNominated: boolean
  votes: string[]
  player: firebase.firestore.DocumentReference
}

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
  animations: [
    trigger('inOut', [
      transition(':enter', [style({ opacity: 0 }), animate('1s ease-out', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('1s ease-in', style({ opacity: 0 }))])
    ])
  ]
})
export class VotingComponent implements OnInit, OnDestroy {
  candidateRefs: TournamentPlayer[]
  playerRefs: TournamentPlayer[]
  candidates: Candidate[] = []
  selectedCandidates: Candidate[] = []
  tournament_id: string
  tournament: Tournamnent
  tournamentDocument: AngularFirestoreDocument<any>
  subscriptions = new Subscription()
  loading = false
  captain_selection_done = false
  authenticated = false
  playerForm = this.fb.group({
    player: [null, Validators.required],
    pin: ['', [Validators.required, Validators.maxLength(4)]],
    captaincy: [false]
  })
  @ViewChild('checkCredentials', { static: false }) checkCredentials: ElementRef<any>
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tournament_id = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentDocument = this.afs.doc<Tournamnent>(`tournaments/${this.tournament_id}`)
    this.subscriptions.add(
      this.tournamentDocument.valueChanges().subscribe(tournament => {
        this.tournament = { id: this.tournament_id, ...tournament }
        this.playerRefs = this.tournament.players
        this.candidateRefs = this.tournament.players.filter(player => player.isNominated)
        for (const playerRef of this.playerRefs) {
          playerRef.player.get().then(doc => {
            if (doc.exists) {
              this.candidates = this.candidates.filter(c => c.id !== doc.id)
              this.candidates.push({
                ...playerRef,
                selected: false,
                id: doc.id,
                ...(doc.data() as Player)
              })
            }
          })
        }
      })
    )
  }

  toggleSelection(event: Event, candidate: Candidate) {
    candidate.selected = !candidate.selected
    if (candidate.selected) {
      this.selectedCandidates = [...this.selectedCandidates, candidate]
    } else {
      this.selectedCandidates = this.selectedCandidates.filter(item => item.id !== candidate.id)
    }
    this.captain_selection_done = this.selectedCandidates.length == (this.tournament && this.tournament.noOfTeams)
  }

  selectPlayer($event) {
    if (this.playerForm.valid && this.playerForm.value.player.pin === this.playerForm.value.pin) {
      const candidate = this.candidates.find(c => c.id == this.playerForm.value.player.id)
      if (candidate && candidate.votes && candidate.votes.length == 0) {
        this.authenticated = true
      } else {
        this._snackBar.open('Already Voted!', '', { panelClass: 'accent', duration: 1500 })
      }
    } else {
      this._snackBar.open('Incorrect Credentials!', '', { panelClass: 'accent', duration: 1500 })
    }
  }

  vote(event: Event) {
    if (this.tournament.votingOpen) {
      const votes = this.selectedCandidates
        .filter(candidate => candidate.selected && candidate.isNominated)
        .map(candidate => ({ id: candidate.id }))
      this.loading = true
      this.tournamentDocument
        .update({
          players: this.candidates.map(player => ({
            count: player.selected && player.isNominated ? player.count + 1 : player.count,
            isNominated: player.isNominated,
            player: player.player,
            votes: this.playerForm.value.player.id == player.id ? votes : player.votes
          }))
        })
        // for clearing all votes
        // .update({
        //   players: this.candidates.map(player => ({
        //     count: 0,
        //     isNominated: player.isNominated,
        //     player: player.player,
        //     votes: []
        //   }))
        // })
        .then(res => {
          this._snackBar.open('Thanks for voting!', '', { panelClass: 'accent', duration: 1500 })
        })
        .catch(err => {
          console.error(err)
          this._snackBar.open('Something went wrong!', '', { panelClass: 'accent', duration: 1500 })
        })
        .finally(() => {
          this.loading = this.authenticated = this.captain_selection_done = false
          this.selectedCandidates = []
          this.candidates.forEach(candidate => (candidate.selected = false))
        })
    } else {
      this._snackBar.open('Voting not active!', '', { panelClass: 'accent', duration: 1500 })
    }
  }
  reset(event: Event) {
    this.candidates.forEach(candidate => (candidate.selected = false))
    this.selectedCandidates = []
    this._snackBar.open('Votes Cleared!', '', { panelClass: 'accent', duration: 1500 })
  }

  displayFn(player?: Player): string | undefined {
    return player ? player.firstName + ' ' + player.lastName : undefined
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
