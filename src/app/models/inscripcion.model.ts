import { Alumno } from "./alumno.model";
import { Curso } from "./curso.model";

export interface Inscripcion {
    id: number;
    idAlumno: number;
    idCruso: number;
    alumno?: Alumno;
    curso?: Curso
  }