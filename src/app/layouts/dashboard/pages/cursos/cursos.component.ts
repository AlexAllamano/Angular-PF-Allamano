import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../../models/curso.model';
import { CursosService } from '../../../../core/services/cursos.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertasService } from '../../../../core/services/alertas.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  cursoAeditar: Curso = null;

  constructor(
    private cursosService: CursosService,
    private loadingService: LoadingService,
    private alertasService: AlertasService
  ) {}

  ngOnInit(){
    this.loadingService.estaCargando(true);

    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      complete: () => {
        this.loadingService.estaCargando(false);
      },
    });
  }

  agregarCurso(cursoNuevo: Curso){
    this.cursosService.agregarCurso(cursoNuevo).subscribe({
      next: (cursos) => {
        this.cursos = [...cursos];
      },
      error: () => {
        this.alertasService.mostrarError();
      },
      complete: () => {
        this.loadingService.estaCargando(false);
        this.alertasService.mostrarOk('Curso agregado');
      },
    });
  }

  borrarCurso(idCurso: number){
    this.loadingService.estaCargando(true);

    this.cursosService.borrarCurso(idCurso).subscribe({
      next: (cursos) => {
        this.cursos = [...cursos];
      },
      error: () => {
        this.alertasService.mostrarError();
      },
      complete: () => {
        this.loadingService.estaCargando(false);
        this.alertasService.mostrarOk('Curso borrado');
      },
    });
  }

  editarCurso(curso: Curso){
    this.cursoAeditar = curso;
  }

  guardarEdicion(curso: Curso){
    this.loadingService.estaCargando(true);

    this.cursosService.editarCurso(curso).subscribe({
      next: (cursos) => {
        console.log(cursos, 'CURSOS POS EDICION')
        this.cursos = [...cursos];
      },
      error: () => {
        this.alertasService.mostrarError();
      },
      complete: () => {
        this.loadingService.estaCargando(false);
        this.alertasService.mostrarOk('Cursos modificado');
      },
    });
  }
}
