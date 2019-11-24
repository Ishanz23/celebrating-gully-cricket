import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { ActivatedRoute } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import * as firebase from 'firebase'
import { Player } from '../../players/player'
import { Subscription } from 'rxjs'
import { Tournamnent } from '../tournament.model'

interface Candidate extends Player {
  count: number
  selected: boolean
}

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit, OnDestroy {
  candidateRefs: { count: number; isNominated: boolean; player: firebase.firestore.DocumentReference }[]
  candidates: Candidate[] = []
  selectedCandidates: Candidate[] = []
  tournament_id: string
  tournament: Tournamnent
  tournamentDocument: AngularFirestoreDocument<any>
  subscriptions = new Subscription()
  loading = false
  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.tournament_id = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentDocument = this.afs.doc<Tournamnent>(`tournaments/${this.tournament_id}`)
    this.subscriptions.add(
      this.tournamentDocument.valueChanges().subscribe(tournament => {
        this.tournament = { id: this.tournament_id, ...tournament }
        this.candidateRefs = this.tournament.players.filter(player => player.isNominated)
        for (const playerRef of this.candidateRefs) {
          playerRef.player.get().then(doc => {
            if (doc.exists) {
              this.candidates.push({ count: playerRef.count, selected: false, ...(doc.data() as Player) })
            }
          })
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  toggleSelection(event: Event, candidate: Candidate) {
    candidate.selected = !candidate.selected
    if (candidate.selected) {
      this.selectedCandidates = [...this.selectedCandidates, candidate]
    } else {
      this.selectedCandidates = this.selectedCandidates.filter(item => item.id !== candidate.id)
    }
  }

  vote(event: Event) {
    this._snackBar.open("Voting hasn't started yet!", '', { panelClass: 'accent', duration: 2000 })
  }
  reset(event: Event) {
    this.candidates.forEach(candidate => (candidate.selected = false))
    this.selectedCandidates = []
    this._snackBar.open('Votes Cleared!', '', { panelClass: 'accent', duration: 2000 })
  }
}
