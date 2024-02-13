import { Alumno } from "./alumno.model";
import { Profesor } from "./profesor.model";

export interface Curso {
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    cupo: number;
    alumnos: Alumno[];
    profesor: Profesor
  }