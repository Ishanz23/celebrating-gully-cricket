import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tournaments: any[]
  loading = true
  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {
    this.afStore
      .collection('tournaments')
      .valueChanges({ idField: 'id' })
      .subscribe(tournaments => {
        this.loading = false
        this.tournaments = tournaments
      })
  }
}
