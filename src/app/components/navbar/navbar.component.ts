import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;

  places: string[] = ["Kolkata", "Pune"];
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isMenuOpen = false;
      }
    });
  }

  navigate(Event: Event, path: string) {
    this.isMenuOpen = false;
    this.router.navigate([path]);
  }
}
