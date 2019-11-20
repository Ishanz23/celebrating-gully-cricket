import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlayersRoutingModule } from "./players-routing.module";
import { SharedModule } from "src/app/components/shared.module";
import { PlayersComponent } from "./players.component";

@NgModule({
  declarations: [PlayersComponent],
  imports: [CommonModule, PlayersRoutingModule, SharedModule]
})
export class PlayersModule {}
