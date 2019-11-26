import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TournamentsRoutingModule } from './tournaments-routing.module'
import { TournamentsComponent } from './tournaments.component'
import { SharedModule } from 'src/app/components/shared.module'
import { EnrollPlayerComponent } from './enroll-player/enroll-player.component'
import { MatSelectModule } from '@angular/material/select'
import { MaterialModule } from 'src/app/material.module';
import { VotingComponent } from './voting/voting.component';
import { TeamsComponent } from './teams/teams.component';
import { VotingResultsComponent } from './voting-results/voting-results.component'

@NgModule({
  declarations: [TournamentsComponent, EnrollPlayerComponent, VotingComponent, TeamsComponent, VotingResultsComponent],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TournamentsModule {}
