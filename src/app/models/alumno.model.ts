import { Curso } from "./curso.model";

export interface Alumno {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    sexo: string;
    edad: number;
    cursos: Curso[];
  }