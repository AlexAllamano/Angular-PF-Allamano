import { Injectable } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { Router } from '@angular/router';
import { AlertasService } from './alertas.service';
import { delay, finalize, map, of, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { AlumnosService } from './alumnos.service';

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
  authAlumno: Alumno | null = null;

  constructor(
    private router: Router,
    private alumnosService: AlumnosService,
    private alertasServices: AlertasService,
    private loadingService: LoadingService
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

  private setAuthAlumno(mockAlumno: Alumno) {
    this.authAlumno = mockAlumno;
    localStorage.setItem('token', 'paosguansdusfpajsnw');
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
      }
      else {
        this.alertasServices.mostrarError('Contraseña incorrecta');
      }
    } else {
      this.alertasServices.mostrarError('Correo no encontrado');
    }
  }

  logout() {
    this.authAlumno = null;
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verificarToken() {
    this.loadingService.estaCargando(true);

    return of(localStorage.getItem('token')).pipe(
      delay(1500),
      map((response) => !!response),
      tap(() => this.setAuthAlumno(alumno)),
      finalize(() => this.loadingService.estaCargando(false))
    );
  }
}
