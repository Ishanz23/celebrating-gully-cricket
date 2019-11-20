import { NgModule } from "@angular/core";

import { LoaderComponent } from "./loader/loader.component";
import { TournamentPanelComponent } from "./tournament-panel/tournament-panel.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  exports: [LoaderComponent, TournamentPanelComponent],
  declarations: [LoaderComponent, TournamentPanelComponent],
  providers: []
})
export class SharedModule {}
