import { Injectable } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { Router } from '@angular/router';
import { AlertasService } from './alertas.service';
import { delay, finalize, map, of, tap } from 'rxjs';
import { LoadingService } from './loading.service';

interface LoginData {
  correo: null | string;
  password: null | string;
}

const Mock_Alumno = {
  nombre: 'Juan',
  apellido: 'Perez',
  correo: 'juanperez@gmail.com',
  password: '1234',
  rol: 'ADMIN',
  cursos: [],
  edad: 23,
  id: "123",
  sexo: 'masculino',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authAlumno: Alumno | null = null;

  constructor(
    private router: Router,
    private alertasServices: AlertasService,
    private loadingService: LoadingService
  ) {}

  private setAuthAlumno(mockAlumno: Alumno){
  this.authAlumno = mockAlumno;
  localStorage.setItem('token', 'paosguansdusfpajsnw');
  }

  login(data: LoginData): void {
    

    if (
      data.correo === Mock_Alumno.correo &&
      data.password === Mock_Alumno.password
    ) {
      this.setAuthAlumno(Mock_Alumno);
      this.router.navigate(['main', 'home']);
    } else {
      this.alertasServices.mostrarError('Correo o contraseña incorrectos');
    }
  }

  logout() {
    this.authAlumno = null;
    localStorage.removeItem('token')
    this.router.navigate(['auth', 'login']);
    
  }

  verificarToken() {

    this.loadingService.estaCargando(true);

    return of(localStorage.getItem('token')).pipe(
      delay(1500),
      map((response) => !!response), 
      tap(() => this.setAuthAlumno(Mock_Alumno)),
      finalize(() => this.loadingService.estaCargando(false))
    );
  }
}
