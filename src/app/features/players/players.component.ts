import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  playersCollection: AngularFirestoreCollection<any>;
  players: any[] = [];
  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {
    this.playersCollection = this.afStore.collection<any>('players');
    this.playersCollection.valueChanges().subscribe(players => {
      this.players = players;
      console.log(players[0]);
    });
  }

  addPlayer() {
    this.playersCollection.add({
      firstName: 'Bivash',
      lastName: 'Saha',
      battingOrientation: 'right',
      bowlingOrientation: 'right',
      specialization: 'all-rounder',
      address: 'Sarsuna',
      mobile: '7059492987',
      career: {
        ballsBowled: 0,
        ballsFaced: 0,
        battingAverage: 0,
        bestBowlingFigures: { runs: '0', wickets: 0 },
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
    });
  }
}
