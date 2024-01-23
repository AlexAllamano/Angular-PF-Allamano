import { CSP_NONCE, Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../../../../models/alumnos.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent {

  dataSource: MatTableDataSource<Alumno>;
  displayedColumns: string[] = ['id','nombre', 'edad', 'sexo', 'correo',  'curso', 'acciones']

  @Input() set alumnos(value: Alumno[]) {
    this.dataSource = new MatTableDataSource(value);
    console.log(this.dataSource.data.length)
  }

  @Output()
  editarAlumno = new EventEmitter<Alumno>();

  @Output()
  borrarAlumno = new EventEmitter<number>();

}
