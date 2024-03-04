import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../../../../../core/services/inscripciones.service';
import { AlumnosService } from '../../../../../core/services/alumnos.service';
import { CursosService } from '../../../../../core/services/cursos.service';

@Injectable()
export class InscripcionesEffects {
  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripciones),
      concatMap(() =>
        this.inscripcionesServices.obtenerInscripcions().pipe(
          map((data) =>
            InscripcionesActions.loadInscripcionesSuccess({ data })
          ),
          catchError((error) =>
            of(InscripcionesActions.loadInscripcionesFailure({ error }))
          )
        )
      )
    );
  });

  crearInsripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.crearInscripcion),
      concatMap((action) =>
        this.inscripcionesServices.agregarInscripcion(action.data).pipe(
          map((data) => InscripcionesActions.crearInscripcionSuccess({ data })),
          catchError((error) =>
            of(InscripcionesActions.crearInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  borrarInsripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.borrarInscripcion),
      concatMap((action) =>
        this.inscripcionesServices.borrarInscripcion(action.data).pipe(
          map((data) => InscripcionesActions.borrarInscripcionSuccess({ data })),
          catchError((error) =>
            of(InscripcionesActions.borrarInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  InsripcionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.crearInscripcionSuccess,InscripcionesActions.borrarInscripcionSuccess),
      map(() => InscripcionesActions.loadInscripciones())
    );
  });




  cargarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.cargarAlumnos),
      concatMap(() =>
        this.alumnosServices.obtenerSoloAlumnos().pipe(
          map((data) => InscripcionesActions.cargarAlumnosSuccess({ data })),
          catchError((error) =>
            of(InscripcionesActions.cargarAlumnosFailure({ error }))
          )
        )
      )
    );
  });

  cargarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.cargarCursos),
      concatMap(() =>
        this.cursosServices.obtenerCursos().pipe(
          map((data) => InscripcionesActions.cargarCursosSuccess({ data })),
          catchError((error) =>
            of(InscripcionesActions.cargarCursosFailure({ error }))
          )
        )
      )
    );
  });

  

  constructor(
    private actions$: Actions,
    private inscripcionesServices: InscripcionesService,
    private alumnosServices: AlumnosService,
    private cursosServices: CursosService
  ) {}
}
