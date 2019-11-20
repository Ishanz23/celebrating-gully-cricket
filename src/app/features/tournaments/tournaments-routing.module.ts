import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TournamentsComponent } from './tournaments.component'
import { EnrollPlayerComponent } from './enroll-player/enroll-player.component'

const routes: Routes = [
  { path: '', component: TournamentsComponent, pathMatch: 'full' },
  { path: 'enroll/:id', component: EnrollPlayerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule {}
