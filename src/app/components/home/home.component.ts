import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  tournaments$: Observable<any[]>;
  constructor(private afStore: AngularFirestore) {}

  ngOnInit() {
    this.tournaments$ = this.afStore.collection("tournaments").valueChanges();
  }
}
