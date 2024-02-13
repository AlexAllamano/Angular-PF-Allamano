import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  private alertas$ = new Subject<SweetAlertOptions>();

  constructor() {
    this.alertas$.subscribe({
      next: (opciones) => {
        Swal.fire(opciones);
      },
    });
  }

  mostrarAlerta(opciones: SweetAlertOptions): void {
    this.alertas$.next(opciones);
  }

  mostrarOk(titulo: string, mensaje?: string) {
    this.alertas$.next({
      icon: 'success',
      title: titulo,
      text: mensaje,
    });
  }

  mostrarError(mensaje?: string) {
    this.alertas$.next({
      icon: 'error',
      title: 'Ocurrió un error',
      text: mensaje,
    });
  }
}
