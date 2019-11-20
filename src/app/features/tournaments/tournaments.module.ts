import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TournamentsRoutingModule } from "./tournaments-routing.module";
import { TournamentsComponent } from "./tournaments.component";
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  declarations: [TournamentsComponent],
  imports: [CommonModule, TournamentsRoutingModule, SharedModule]
})
export class TournamentsModule {}
