import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import * as firebase from 'firebase'
import { Player } from '../../players/player'
import { Subscription } from 'rxjs'
import { Tournamnent } from '../tournament.model'

interface Candidate extends Player {
  count: number
  selected: boolean
  isNominated: boolean
  player: firebase.firestore.DocumentReference
}

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit, OnDestroy {
  candidateRefs: { count: number; isNominated: boolean; player: firebase.firestore.DocumentReference }[]
  playerRefs: { count: number; isNominated: boolean; player: firebase.firestore.DocumentReference }[]
  candidates: Candidate[] = []
  selectedCandidates: Candidate[] = []
  tournament_id: string
  tournament: Tournamnent
  tournamentDocument: AngularFirestoreDocument<any>
  subscriptions = new Subscription()
  loading = false
  captain_selection_done = false
  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, private _snackBar: MatSnackBar) {}

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

  vote(event: Event) {
    this.loading = true
    // this.candidates.forEach(c => {
    //   console.log({
    //     name: c.firstName,
    //     count: c.count
    //   })
    // })
    this.tournamentDocument
      .update({
        players: this.candidates.map(player => ({
          count: player.selected && player.isNominated ? player.count + 1 : player.count,
          isNominated: player.isNominated,
          player: player.player
        }))
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => (this.loading = false))
    // this._snackBar.open("Voting hasn't started yet!", '', { panelClass: 'accent', duration: 2000 })
  }
  reset(event: Event) {
    this.candidates.forEach(candidate => (candidate.selected = false))
    this.selectedCandidates = []
    this._snackBar.open('Votes Cleared!', '', { panelClass: 'accent', duration: 2000 })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
