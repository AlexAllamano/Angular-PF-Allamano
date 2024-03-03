import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../../../../../models/inscripcion.model';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  inscripcions: Inscripcion[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  inscripcions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, (state) => ({...state, loading: true})),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => ({...state, loading: false, inscripcions: action.data})),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => ({...state, loading: false, error: action.error})),
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

