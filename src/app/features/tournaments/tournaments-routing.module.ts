import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TournamentsComponent } from './tournaments.component'
import { EnrollPlayerComponent } from './enroll-player/enroll-player.component'
import { VotingComponent } from './voting/voting.component'

const routes: Routes = [
  { path: '', component: TournamentsComponent, pathMatch: 'full' },
  { path: 'enroll/:id', component: EnrollPlayerComponent },
  { path: 'vote/:id', component: VotingComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule {}
