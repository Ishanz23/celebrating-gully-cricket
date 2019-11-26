import { NgModule } from '@angular/core'

import { LoaderComponent } from './loader/loader.component'
import { TournamentPanelComponent } from './tournament-panel/tournament-panel.component'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '../material.module'

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [LoaderComponent, TournamentPanelComponent],
  declarations: [LoaderComponent, TournamentPanelComponent],
  providers: []
})
export class SharedModule {}
