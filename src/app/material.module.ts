import { NgModule } from '@angular/core'
import { MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms'
import { MatOptionModule } from '@angular/material/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatRadioModule } from '@angular/material/radio'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'

@NgModule({
  imports: [],
  exports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [],
  providers: []
})
export class MaterialModule {}
