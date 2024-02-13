import { Curso } from "./curso.model";

export interface Profesor {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  curso: Curso;
  }