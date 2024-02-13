import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Curso } from '../../models/curso.model';

let CURSOS_DB: Curso[] = [
      {
        id: 1,
        nombre: 'Introducción a Angular',
        fechaInicio: new Date('2024-03-01'),
        fechaFin: new Date('2024-03-30'),
        cupo: 30,
        alumnos: [],
        profesor: { 
          id: 1,
          nombre: 'Nombre',
          apellido: '',
          correo: '',
          curso: null
        },
      },
      {
        id: 2,
        nombre: 'Desarrollo Web con React',
        fechaInicio: new Date('2024-04-01'),
        fechaFin: new Date('2024-04-30'),
        cupo: 25,
        alumnos: [],
        profesor: { 
          id: 1,
          nombre: 'Nombre',
          apellido: '',
          correo: '',
          curso: null
        },
      },
];
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor() {}

  agregarCurso(nuevoCurso: Curso) {
    console.log(nuevoCurso, 'NUEVO CURSO')
    CURSOS_DB.push(nuevoCurso);
    return this.obtenerCursos();
  }

  editarCurso(curso: Curso) {
    console.log(curso, 'Curso en Services')

    let index = CURSOS_DB.findIndex((a) => a.id === curso.id);
    console.log(CURSOS_DB)
    console.log(index)
    if (index !== -1) {
      console.log('estoy por editar')
      CURSOS_DB[index] = curso;
    }
    return this.obtenerCursos();
  }

  borrarCurso(idCurso: number) {
    CURSOS_DB = CURSOS_DB.filter((a) => a.id !== idCurso);
    return this.obtenerCursos();
  }

  obtenerCursos() {
    return of(CURSOS_DB).pipe(delay(1000));
  }

  
  obtenerCursoID(id:number): Observable<Curso | undefined>{
    return of(CURSOS_DB.find((a) => a.id == id)).pipe(delay(1000));
  }
}
