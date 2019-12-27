import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: any[]
  loading = true
  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {
    this.afStore
      .collection('tournaments')
      .valueChanges({ idField: 'id' })
      .subscribe(
        tournaments => {
          this.loading = false
          this.tournaments = tournaments
        },
        err => {
          this.loading = false
          console.error(err)
        }
      )
  }
}
