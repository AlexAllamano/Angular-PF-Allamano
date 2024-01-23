import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../models/alumnos.model';

@Pipe({
  name: 'nombreApellido'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(alumno: any): string {
    return `${alumno.nombre} ${alumno.apellido}`;
  }
}
