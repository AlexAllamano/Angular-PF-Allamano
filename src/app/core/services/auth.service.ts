import { Injectable } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { Router } from '@angular/router';
import { AlertasService } from './alertas.service';
import { catchError, delay, finalize, map, of, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { AlumnosService } from './alumnos.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/actions';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../enviroments/entiroment';

interface LoginData {
  correo: null | string;
  password: null | string;
}

let Mock_Alumnos: Alumno[] = [];
let alumno: Alumno = null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private alumnosService: AlumnosService,
    private alertasServices: AlertasService,
    private loadingService: LoadingService,
    private httpClient: HttpClient,
    private store: Store
  ) {
    this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos) => {
        Mock_Alumnos = alumnos;
      },
      complete: () => {
        console.log(Mock_Alumnos);
        this.loadingService.estaCargando(false);
      },
    });
  }

  private setAuthAlumno(alumno: Alumno) {
    this.store.dispatch(AuthActions.setAuthAlumno({ alumno: alumno }));
    localStorage.setItem('token', alumno.token);
  }

  login(data: LoginData): void {
    console.log(
      data,
      Mock_Alumnos.find((item) => item.correo == data.correo)
    );

    if (Mock_Alumnos.find((item) => item.correo == data.correo)) {
      alumno = Mock_Alumnos.find((item) => item.correo == data.correo);
      console.log('encontré alumno', alumno);

      if (data.password == alumno.password) {
        this.setAuthAlumno(alumno);
        this.router.navigate(['main', 'home']);
      } else {
        this.alertasServices.mostrarError('Contraseña incorrecta');
      }
    } else {
      this.alertasServices.mostrarError('Correo no encontrado');
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verificarToken() {
    return (
      this.httpClient
        .get<Alumno[]>(
          `${enviroment.apiUrl}/alumnos?token=${localStorage.getItem('token')}`
        )
        .pipe(
          map((response) => {
            if (response.length) {
              this.setAuthAlumno(response[0]);
              return true;
            } else {
              this.store.dispatch(AuthActions.logout());
              localStorage.removeItem('token');
              return false;
            }
          }),
          catchError(() => of(false))
        )
      
    );
  }
}
