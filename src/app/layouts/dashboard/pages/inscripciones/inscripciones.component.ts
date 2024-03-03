import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Inscripcion } from '../../../../models/inscripcion.model';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertasService } from '../../../../core/services/alertas.service';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { selectIncsripciones } from './store/inscripciones.selectors';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss',
})
export class InscripcionesComponent implements OnDestroy {
  inscrpciones$: Observable<Inscripcion[]>;

  displayedColumns: string[] = ['idInsc', 'nombreAlumno', 'curso', 'acciones'];
  dataSource = null;

  suscripcion: Subscription;

  constructor(
    private store: Store,
    private loadingService: LoadingService,
    private alertService: AlertasService
  ) {
    this.inscrpciones$ = this.store.select(selectIncsripciones);

    this.store.dispatch(InscripcionesActions.loadInscripciones());

    this.suscripcion = this.inscrpciones$.subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
    });
  }

  borrarInscripcion(inscripcion: Inscripcion) {
    // this.loadingService.estaCargando(true);
    // console.log(inscripcion);
    // this.inscServices.borrarInscripcion(inscripcion.id).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.dataSource = [...data];
    //   },
    //   error: () => {
    //     this.alertService.mostrarError();
    //   },
    //   complete: () => {
    //     this.loadingService.estaCargando(false);
    //     this.alertService.mostrarOk('Alumno borrado');
    //   },
    // });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
