import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Curso } from '../../../../../models/curso.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent {

  constructor(){
    
  }

  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>([]);
  displayedColumns: string[] = ['id','nombre', 'cupo', 'fechaInicio', 'fechaFin', 'acciones']

  @Input() set cursos(value: Curso[]) {
    this.dataSource = new MatTableDataSource(value);
  }

  @Output()
  editarCurso = new EventEmitter<Curso>();

  @Output()
  borrarCurso = new EventEmitter<number>();


}
