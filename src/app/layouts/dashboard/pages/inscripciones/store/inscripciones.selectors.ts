import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripciones.State>(
  fromInscripciones.inscripcionesFeatureKey
);

export const selectIncsripciones = createSelector(selectInscripcionesState, (state) => state.inscripcions)
export const selectLoading = createSelector(selectInscripcionesState, (state) => state.loading)