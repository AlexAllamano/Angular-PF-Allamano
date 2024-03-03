import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { enviroment } from '../../../enviroments/entiroment';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { Inscripcion } from '../../models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(
    private httpClient: HttpClient,
    private alertaService: AlertasService
  ) {}

  obtenerInscripcions(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(`${enviroment.apiUrl}/inscripciones?_embed=alumno&_embed=curso`).pipe(
      catchError((error) => {
        this.alertaService.mostrarError(
          'Error al cargar los inscripciones, intente de nuevo más tarde'
        );
        return of([]);
      })
    );
  }

  obtenerInscripcionID(id: string): Observable<Inscripcion | undefined> {
    // return of(ALUMNOS_DB.find((a) => a.id == id)).pipe(delay(1000));
    return this.httpClient.get<Inscripcion>(`${enviroment.apiUrl}/inscripciones?_embed=alumno&_embed=curso/${id}`);
  }

  agregarInscripcion(nuevoInscripcion: Inscripcion): Observable<Inscripcion[]> {
    // ALUMNOS_DB.push(nuevoInscripcion);
    // return this.obtenerInscripcions();

    return this.httpClient
      .post<Inscripcion>(`${enviroment.apiUrl}/inscripciones`, nuevoInscripcion)
      .pipe(
        mergeMap(() => this.obtenerInscripcions()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar agregar');
          return of([]);
        })
      );
  }

  editarInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]> {
    // let index = ALUMNOS_DB.findIndex((a) => a.id === inscripcion.id);
    // if (index !== -1) {
    //   ALUMNOS_DB[index] = inscripcion;
    // }
    // return this.obtenerInscripcions();

    return this.httpClient
      .patch(`${enviroment.apiUrl}/inscripciones?_embed=alumno&_embed=curso/${inscripcion.id}`, inscripcion)
      .pipe(
        mergeMap(() => this.obtenerInscripcions()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar modificar');
          return of([]);
        })
      );
  }

  borrarInscripcion(idInscripcion: number): Observable<Inscripcion[]> {
    // ALUMNOS_DB = ALUMNOS_DB.filter((a) => a.id !== idInscripcion);
    // return this.obtenerInscripcions();

    console.log(idInscripcion)

    return this.httpClient
      .delete<Inscripcion>(`${enviroment.apiUrl}/inscripciones/${idInscripcion}`)
      .pipe(
        mergeMap(() => this.obtenerInscripcions()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar borrar');
          return of([]);
        })
      );
  }
}
