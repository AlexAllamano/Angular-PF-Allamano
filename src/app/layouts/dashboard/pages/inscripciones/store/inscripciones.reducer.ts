import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../../../../../models/inscripcion.model';
import { Alumno } from '../../../../../models/alumno.model';
import { Curso } from '../../../../../models/curso.model';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  inscripcions: Inscripcion[],
  alumnos: Alumno[],
  cursos: Curso[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  inscripcions: [],
  alumnos: [],
  cursos: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, (state) => ({...state, loading: true})),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => ({...state, loading: false, inscripcions: action.data})),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => ({...state, loading: false, error: action.error})),
  on(InscripcionesActions.cargarAlumnos, (state) => ({...state, loading: true})),
  on(InscripcionesActions.cargarAlumnosSuccess, (state, action) => ({...state, loading: false, alumnos: action.data})),
  on(InscripcionesActions.cargarAlumnosFailure, (state, action) => ({...state, loading: false, error: action.error})),
  on(InscripcionesActions.cargarCursos, (state) => ({...state, loading: true})),
  on(InscripcionesActions.cargarCursosSuccess, (state, action) => ({...state, loading: false, cursos: action.data})),
  on(InscripcionesActions.cargarCursosFailure, (state, action) => ({...state, loading: false, error: action.error})),

);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

