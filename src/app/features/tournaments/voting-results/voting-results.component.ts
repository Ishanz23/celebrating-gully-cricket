import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { ActivatedRoute } from '@angular/router'
import * as _ from 'lodash'
import { Tournamnent, TournamentPlayer } from '../tournament.model'
import { Subscription } from 'rxjs'
import { Candidate } from '../voting/voting.component'
import { Player } from '../../players/player'

@Component({
  selector: 'app-voting-results',
  templateUrl: './voting-results.component.html',
  styleUrls: ['./voting-results.component.scss']
})
export class VotingResultsComponent implements OnInit {
  tournament_id: string
  tournament: Tournamnent
  tournamentDocument: AngularFirestoreDocument<any>
  subscriptions = new Subscription()
  loading = false
  candidateRefs: TournamentPlayer[]
  playerRefs: TournamentPlayer[]
  candidates: Candidate[] = []
  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.tournament_id = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentDocument = this.afs.doc<Tournamnent>(`tournaments/${this.tournament_id}`)
    this.subscriptions.add(
      this.tournamentDocument.valueChanges().subscribe(tournament => {
        this.tournament = { id: this.tournament_id, ...tournament }
        this.playerRefs = this.tournament.players
        this.candidateRefs = _.orderBy(
          this.tournament.players.filter(player => player.isNominated),
          ['count'],
          ['desc']
        )
        for (const playerRef of this.candidateRefs) {
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
}
