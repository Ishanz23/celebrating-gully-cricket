import { NgModule } from '@angular/core'
import { MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms'
import { MatOptionModule } from '@angular/material/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  imports: [],
  exports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [],
  providers: []
})
export class MaterialModule {}
