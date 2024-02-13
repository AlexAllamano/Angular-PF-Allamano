import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../../../../models/alumno.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent {

  constructor(private router: Router){

  }

  dataSource: MatTableDataSource<Alumno>;
  displayedColumns: string[] = ['id','nombre', 'edad', 'sexo', 'correo', 'acciones']

  @Input() set alumnos(value: Alumno[]) {
    this.dataSource = new MatTableDataSource(value);
  }

  @Output()
  editarAlumno = new EventEmitter<Alumno>();

  @Output()
  borrarAlumno = new EventEmitter<number>();

}
