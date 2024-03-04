import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertasService } from './alertas.service';
import { enviroment } from '../../../enviroments/entiroment';
import { Observable, catchError, mergeMap, of } from 'rxjs';
import { CrearInscripcion, Inscripcion } from '../../models/inscripcion.model';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  constructor(
    private httpClient: HttpClient,
    private alertaService: AlertasService
  ) {}

  obtenerInscripcions(): Observable<Inscripcion[]> {
    return this.httpClient
      .get<Inscripcion[]>(
        `${enviroment.apiUrl}/inscripciones?_embed=alumno&_embed=curso`
      )
      .pipe(
        catchError((error) => {
          this.alertaService.mostrarError(
            'Error al cargar los inscripciones, intente de nuevo más tarde'
          );
          return of([]);
        })
      );
  }

  obtenerInscripcionID(id: string): Observable<Inscripcion | undefined> {
    return this.httpClient.get<Inscripcion>(
      `${enviroment.apiUrl}/inscripciones?_embed=alumno&_embed=curso/${id}`
    );
  }

  agregarInscripcion(
    nuevoInscripcion: CrearInscripcion
  ): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(
      `${enviroment.apiUrl}/inscripciones`,
      nuevoInscripcion
    );
  }

  editarInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]> {
    return this.httpClient
      .patch(
        `${enviroment.apiUrl}/inscripciones?_embed=alumno&_embed=curso/${inscripcion.id}`,
        inscripcion
      )
      .pipe(
        mergeMap(() => this.obtenerInscripcions()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar modificar');
          return of([]);
        })
      );
  }

  borrarInscripcion(idInscripcion: string): Observable<Inscripcion> {
    console.log(idInscripcion);

    return this.httpClient.delete<Inscripcion>(`${enviroment.apiUrl}/inscripciones/${idInscripcion}`
    );
  }
}
