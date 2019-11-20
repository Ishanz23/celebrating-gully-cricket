import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-tournaments",
  templateUrl: "./tournaments.component.html",
  styleUrls: ["./tournaments.component.scss"]
})
export class TournamentsComponent implements OnInit {
  tournaments$: Observable<any[]>;
  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {
    this.tournaments$ = this.afStore.collection("tournaments").valueChanges();
  }
}
