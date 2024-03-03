import { createReducer, on } from "@ngrx/store";
import { Alumno } from "../../../../models/alumno.model";
import { AuthActions } from "../actions";



export const featureName = "auth";

export interface AuthState {
    alumno: Alumno | null
}

const initialState: AuthState = {
    alumno: null
}

export const authReducer = createReducer(initialState, 
    on(AuthActions.setAuthAlumno, (state, actions) => {
    return {
        ...state,
        alumno: actions.alumno
    }
}), 
on(AuthActions.logout, () => initialState)
);