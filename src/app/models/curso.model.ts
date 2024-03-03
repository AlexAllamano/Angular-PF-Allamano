import { Alumno } from "./alumno.model";

export interface Curso {
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    cupo: number;
    alumnos: Alumno[];
  }