import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Alumno } from "../../../../models/alumno.model";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set auth alumno': props<{alumno: Alumno}>(),
        'logout': emptyProps()
    }
})