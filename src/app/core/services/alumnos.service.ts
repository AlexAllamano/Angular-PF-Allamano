import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Alumno } from '../../models/alumno.model';

let ALUMNOS_DB: Alumno[] = [
  {
    id: 1,
    nombre: 'Alex',
    apellido: 'Allamano',
    correo: 'aallamano@gmail.com',
    sexo: 'Masculino',
    edad: 24,
    cursos: [
      {
        id: 1,
        nombre: 'Introducción a Angular',
        fechaInicio: new Date('2024-03-01'),
        fechaFin: new Date('2024-03-30'),
        cupo: 30,
        alumnos: [],
        profesor: null,
      },
    ],
  },
  {
    id: 2,
    nombre: 'Constanza',
    apellido: 'Rodríguez',
    correo: 'crodriguez@gmail.com',
    sexo: 'Femenino',
    edad: 20,
    cursos: [
      {
        id: 2,
        nombre: 'Desarrollo Web con React',
        fechaInicio: new Date('2024-04-01'),
        fechaFin: new Date('2024-04-30'),
        cupo: 25,
        alumnos: [],
        profesor: null,
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor() {}

  agregarAlumno(nuevoAlumno: Alumno) {
    ALUMNOS_DB.push(nuevoAlumno);
    return this.obtenerAlumnos();
  }

  editarAlumno(alumno: Alumno) {
    let index = ALUMNOS_DB.findIndex((a) => a.id === alumno.id);
    if (index !== -1) {
      ALUMNOS_DB[index] = alumno;
    }
    return this.obtenerAlumnos();
  }

  borrarAlumno(idAlumno: number) {
    ALUMNOS_DB = ALUMNOS_DB.filter((a) => a.id !== idAlumno);
    return this.obtenerAlumnos();
  }

  obtenerAlumnos() {
    return of(ALUMNOS_DB).pipe(delay(1000));
  }

  
  obtenerAlumnoID(id:number): Observable<Alumno | undefined>{
    return of(ALUMNOS_DB.find((a) => a.id == id)).pipe(delay(1000));
  }
}
