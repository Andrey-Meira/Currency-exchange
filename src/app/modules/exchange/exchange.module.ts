import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from './exchange.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [ExchangeComponent],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule
  ],
})
export class ExchangeModule {}
