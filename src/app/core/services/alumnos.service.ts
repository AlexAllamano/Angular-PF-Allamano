import { Injectable } from '@angular/core';
import { Observable, catchError, delay, mergeMap, of } from 'rxjs';
import { Alumno } from '../../models/alumno.model';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroments/entiroment';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(
    private httpClient: HttpClient,
    private alertaService: AlertasService
  ) {}

  obtenerAlumnos(): Observable<Alumno[]> {
    // return of(ALUMNOS_DB).pipe(delay(1000));
    return this.httpClient.get<Alumno[]>(`${enviroment.apiUrl}/alumnos`).pipe(
      catchError((error) => {
        this.alertaService.mostrarError(
          'Error al cargar los alumnos, intente de nuevo más tarde'
        );
        return of([]);
      })
    );
  }

  obtenerAlumnoID(id: string): Observable<Alumno | undefined> {
    // return of(ALUMNOS_DB.find((a) => a.id == id)).pipe(delay(1000));
    return this.httpClient.get<Alumno>(`${enviroment.apiUrl}/alumnos/${id}`);
  }

  agregarAlumno(nuevoAlumno: Alumno): Observable<Alumno[]> {
    // ALUMNOS_DB.push(nuevoAlumno);
    // return this.obtenerAlumnos();

    return this.httpClient
      .post<Alumno>(`${enviroment.apiUrl}/alumnos`, nuevoAlumno)
      .pipe(
        mergeMap(() => this.obtenerAlumnos()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar agregar');
          return of([]);
        })
      );
  }

  editarAlumno(alumno: Alumno): Observable<Alumno[]> {
    // let index = ALUMNOS_DB.findIndex((a) => a.id === alumno.id);
    // if (index !== -1) {
    //   ALUMNOS_DB[index] = alumno;
    // }
    // return this.obtenerAlumnos();

    return this.httpClient
      .patch(`${enviroment.apiUrl}/alumnos/${alumno.id}`, alumno)
      .pipe(
        mergeMap(() => this.obtenerAlumnos()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar modificar');
          return of([]);
        })
      );
  }

  borrarAlumno(idAlumno: number): Observable<Alumno[]> {
    // ALUMNOS_DB = ALUMNOS_DB.filter((a) => a.id !== idAlumno);
    // return this.obtenerAlumnos();

    return this.httpClient
      .delete<Alumno>(`${enviroment.apiUrl}/alumnos/${idAlumno}`)
      .pipe(
        mergeMap(() => this.obtenerAlumnos()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar borrar');
          return of([]);
        })
      );
  }
}
