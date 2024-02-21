import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { TituloEstiloDirective } from './directives/titulo-estilo.directive';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NombreApellidoPipe, TituloEstiloDirective],
  imports: [CommonModule],
  exports: [
    NombreApellidoPipe,
    TituloEstiloDirective,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
})
export class HelpersModule {}
