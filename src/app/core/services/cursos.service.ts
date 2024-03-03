import { Injectable } from '@angular/core';
import { Observable, catchError, delay, mergeMap, of } from 'rxjs';
import { Curso } from '../../models/curso.model';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { enviroment } from '../../../enviroments/entiroment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(private httpClient: HttpClient,
    private alertaService: AlertasService) {}

    obtenerCursos(): Observable<Curso[]> {
      return this.httpClient.get<Curso[]>(`${enviroment.apiUrl}/cursos`).pipe(
        catchError((error) => {
          this.alertaService.mostrarError(
            'Error al cargar los cursos, intente de nuevo más tarde'
          );
          return of([]);
        })
      );
    }
  
    
    obtenerCursoID(id:number): Observable<Curso | undefined>{
      return this.httpClient.get<Curso>(`${enviroment.apiUrl}/cursos/${id}`);
    }

  agregarCurso(nuevoCurso: Curso) {
    return this.httpClient
      .post<Curso>(`${enviroment.apiUrl}/cursos`, nuevoCurso)
      .pipe(
        mergeMap(() => this.obtenerCursos()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar agregar');
          return of([]);
        })
      );
  }

  editarCurso(curso: Curso) {

    console.log(curso, 'CURSO POR EDITAR')

    return this.httpClient
      .patch(`${enviroment.apiUrl}/cursos/${curso.id}`, curso)
      .pipe(
        mergeMap(() => this.obtenerCursos()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar modificar');
          return of([]);
        })
      );
  }

  borrarCurso(idCurso: number) {
    return this.httpClient
      .delete<Curso>(`${enviroment.apiUrl}/cursos/${idCurso}`)
      .pipe(
        mergeMap(() => this.obtenerCursos()),
        catchError((error) => {
          this.alertaService.mostrarError('Error al intentar borrar');
          return of([]);
        })
      );
  }

  
}
