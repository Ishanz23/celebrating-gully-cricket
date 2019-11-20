import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./features/tournaments/tournaments.module').then(
        m => m.TournamentsModule
      )
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./features/players/players.module').then(m => m.PlayersModule)
  },
  {
    path: 'enroll',
    redirectTo: 'tournaments/enroll'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
