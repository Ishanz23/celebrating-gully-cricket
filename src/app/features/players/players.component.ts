import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Player } from './player'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  loading = true
  playersCollection: AngularFirestoreCollection<Player>
  players: any[] = []
  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.playersCollection = this.afs.collection<Player>('players', ref => ref.orderBy('firstName'))
    this.playersCollection.valueChanges({ idField: 'id' }).subscribe(players => {
      this.loading = false
      this.players = players
    })
  }

  addPlayer() {
    this.playersCollection.doc('sumit-das').set({
      firstName: 'Sumit',
      lastName: 'Das',
      nickName: 'Subho',
      battingOrientation: 'right',
      bowlingOrientation: 'right',
      specialization: 'all-rounder',
      address: 'Sarsuna',
      mobile: '8961382295',
      tournaments: [
        {
          tournmanent: this.afs.collection('tournaments').doc('para-cricket-league-2020').ref
        }
      ],
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
      }
    })
  }
}
