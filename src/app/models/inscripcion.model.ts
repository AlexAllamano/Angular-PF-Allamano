import { Alumno } from './alumno.model';
import { Curso } from './curso.model';

export interface Inscripcion {
  id: string;
  idAlumno: number;
  idCruso: number;
  alumno?: Alumno;
  curso?: Curso;
}

export interface CrearInscripcion {
  idAlumno: number | number | null;
  idCruso: number | number | null;
}
