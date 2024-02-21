import { Curso } from "./curso.model";

export interface Alumno {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    rol: string;
    sexo: string;
    edad: number;
    cursos: Curso[];
  }