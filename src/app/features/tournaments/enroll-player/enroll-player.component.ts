import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { AngularFirestore } from '@angular/fire/firestore'
import { Player } from '../../players/player'
import { FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-enroll-player',
  templateUrl: './enroll-player.component.html',
  styleUrls: ['./enroll-player.component.scss']
})
export class EnrollPlayerComponent implements OnInit {
  tournament_id: string
  myControl = new FormControl()
  players: Player[]
  is_enrolled = false
  playerType: 'none' | 'new' | 'registered' = 'none'
  newPlayerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    nickName: [''],
    address: [''],
    mobile: ['', Validators.required],
    yearOfBirth: [1992, Validators.required],
    pin: [1234, Validators.required],
    battingOrientation: [''],
    bowlingOrientation: [''],
    specialization: ['']
  })

  constructor(private activatedRoute: ActivatedRoute, private afs: AngularFirestore, private fb: FormBuilder) {}

  ngOnInit() {
    this.afs
      .collection<Player>('players')
      .valueChanges({ idField: 'id' })
      .subscribe(players => {
        this.players = players
      })
    this.tournament_id = this.activatedRoute.snapshot.paramMap.get('id')
  }

  displayFn(player?: Player): string | undefined {
    return player ? player.firstName + ' ' + player.lastName : undefined
  }

  enroll(event: Event, newPlayer = false) {
    console.log(this.myControl.value)
    this.is_enrolled = true
  }

  reset() {}
}
