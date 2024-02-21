import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { FormComponent } from './form/form.component';
import { ListadoComponent } from './listado/listado.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HelpersModule } from '../../../../helpers/helpers.module';
import { RouterModule } from '@angular/router';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';


@NgModule({
  declarations: [AlumnosComponent, FormComponent, ListadoComponent, DetalleAlumnoComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,    
    HelpersModule,
    AlumnosRoutingModule
  ],
  exports: [AlumnosComponent],
})
export class AlumnosModule {}
