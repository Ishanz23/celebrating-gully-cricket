import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PlayersRoutingModule } from './players-routing.module'
import { SharedModule } from 'src/app/components/shared.module'
import { PlayersComponent } from './players.component'
import { MaterialModule } from 'src/app/material.module'

@NgModule({
  declarations: [PlayersComponent],
  imports: [CommonModule, PlayersRoutingModule, SharedModule, MaterialModule]
})
export class PlayersModule {}
