import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TournamentsRoutingModule } from './tournaments-routing.module'
import { TournamentsComponent } from './tournaments.component'
import { SharedModule } from 'src/app/components/shared.module'
import { EnrollPlayerComponent } from './enroll-player/enroll-player.component'
import { MatSelectModule } from '@angular/material/select'
import { MaterialModule } from 'src/app/material.module'

@NgModule({
  declarations: [TournamentsComponent, EnrollPlayerComponent],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TournamentsModule {}
