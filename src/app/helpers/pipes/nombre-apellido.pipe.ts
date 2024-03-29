import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../../models/alumno.model';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreApellidoPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {
    return `${value.nombre} ${value.apellido}`;
  }

}
