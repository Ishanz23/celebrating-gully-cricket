import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading: boolean = false
  subscriptions = new Subscription()
  constructor(private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true
        } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
          this.loading = false
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
