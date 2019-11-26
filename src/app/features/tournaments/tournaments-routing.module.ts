import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TournamentsComponent } from './tournaments.component'
import { EnrollPlayerComponent } from './enroll-player/enroll-player.component'
import { VotingComponent } from './voting/voting.component'
import { TeamsComponent } from './teams/teams.component'
import { VotingResultsComponent } from './voting-results/voting-results.component'

const routes: Routes = [
  { path: '', component: TournamentsComponent, pathMatch: 'full' },
  { path: 'enroll/:id', component: EnrollPlayerComponent },
  { path: 'vote/:id', component: VotingComponent },
  { path: 'voting-results/:id', component: VotingResultsComponent },
  { path: 'teams/:id', component: TeamsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule {}
