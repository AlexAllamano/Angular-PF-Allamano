import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CrearInscripcion,
  Inscripcion,
} from '../../../../../models/inscripcion.model';
import { Alumno } from '../../../../../models/alumno.model';
import { Curso } from '../../../../../models/curso.model';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: Inscripcion[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),

    'Crear Inscripcion': props<{ data: CrearInscripcion }>(),
    'Crear Inscripcion Success': props<{ data: Inscripcion }>(),
    'Crear Inscripcion Failure': props<{ error: unknown }>(),

    'Borrar Inscripcion': props<{ data: string }>(),
    'Borrar Inscripcion Success': props<{ data: Inscripcion }>(),
    'Borrar Inscripcion Failure': props<{ error: unknown }>(),

    'Cargar Alumnos': emptyProps(),
    'Cargar Alumnos Success': props<{ data: Alumno[] }>(),
    'Cargar Alumnos Failure': props<{ error: unknown }>(),

    'Cargar Cursos': emptyProps(),
    'Cargar Cursos Success': props<{ data: Curso[] }>(),
    'Cargar Cursos Failure': props<{ error: unknown }>(),
  },
});
