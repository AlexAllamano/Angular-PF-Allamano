import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../../models/alumno.model';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertasService } from '../../../../core/services/alertas.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
})
export class AlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumnoAeditar: Alumno = null;

  constructor(
    private alumnosService: AlumnosService,
    private loadingService: LoadingService,
    private alertasService: AlertasService
  ) {}

  ngOnInit(): void {
    this.loadingService.estaCargando(true);

    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
      },
      complete: () => {
        this.loadingService.estaCargando(false);
      },
    });
  }

  agregarAlumno(nuevoAlumno: Alumno) {
    this.alumnosService.agregarAlumno(nuevoAlumno).subscribe({
      next: (alumnos) => {
        this.alumnos = [...alumnos];
      },
      error: () => {
        this.alertasService.mostrarError();
      },
      complete: () => {
        this.loadingService.estaCargando(false);
        this.alertasService.mostrarOk('Alumno agregado');
      },
    });
  }

  editarAlumno(alumno: Alumno) {
    this.alumnoAeditar = alumno;
  }

  guardarEdicion(alumno: Alumno) {
    this.loadingService.estaCargando(true);

    this.alumnosService.editarAlumno(alumno).subscribe({
      next: (alumnos) => {
        this.alumnos = [...alumnos];
      },
      error: () => {
        this.alertasService.mostrarError();
      },
      complete: () => {
        this.loadingService.estaCargando(false);
        this.alertasService.mostrarOk('Alumno modificado');
      },
    });
  }

  borrarAlumno(idAlumno: number) {
    this.loadingService.estaCargando(true);

    this.alumnosService.borrarAlumno(idAlumno).subscribe({
      next: (alumnos) => {
        this.alumnos = [...alumnos];
      },
      error: () => {
        this.alertasService.mostrarError();
      },
      complete: () => {
        this.loadingService.estaCargando(false);
        this.alertasService.mostrarOk('Alumno borrado');
      },
    });
  }
}
