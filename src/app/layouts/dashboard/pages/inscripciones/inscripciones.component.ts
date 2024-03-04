import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Inscripcion } from '../../../../models/inscripcion.model';
import { LoadingService } from '../../../../core/services/loading.service';
import { AlertasService } from '../../../../core/services/alertas.service';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import {
  selectAlumnos,
  selectCrusos,
  selectIncsripciones,
} from './store/inscripciones.selectors';
import { Alumno } from '../../../../models/alumno.model';
import { Curso } from '../../../../models/curso.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss',
})
export class InscripcionesComponent implements OnDestroy, OnInit {
  inscrpciones$: Observable<Inscripcion[]>;
  alumnos$: Observable<Alumno[]>;
  cursos$: Observable<Curso[]>;

  displayedColumns: string[] = ['idInsc', 'nombreAlumno', 'curso', 'acciones'];
  dataSource = null;

  formDesactivado: boolean = true;
  formInscripcion: FormGroup;

  suscripcion: Subscription;

  constructor(
    private store: Store,
    private loadingService: LoadingService,
    private alertService: AlertasService,
    private fb: FormBuilder
  ) {
    this.formInscripcion = this.fb.group({
      alumnoId: this.fb.control('', Validators.required),
      cursoId: this.fb.control('', Validators.required),
    });

    this.formInscripcion.get('alumnoId').disable();
    this.formInscripcion.get('cursoId').disable();

    this.inscrpciones$ = this.store.select(selectIncsripciones);
    this.alumnos$ = this.store.select(selectAlumnos);
    this.cursos$ = this.store.select(selectCrusos);

    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.store.dispatch(InscripcionesActions.cargarAlumnos());
    this.store.dispatch(InscripcionesActions.cargarCursos());

    this.suscripcion = this.inscrpciones$.subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log(this.dataSource);
      },
    });
  }

  borrarInscripcion(inscripcion: Inscripcion) {
    this.store.dispatch(InscripcionesActions.borrarInscripcion({data: inscripcion.id}))
  }

  onSubmit() {
    console.log(this.formInscripcion.value);

    if (this.formInscripcion.invalid) {
      this.formInscripcion.markAllAsTouched();
    } else {
      this.store.dispatch(
        InscripcionesActions.crearInscripcion({
          data: this.formInscripcion.value,
        })
      );
      this.formDesactivado = !this.formDesactivado;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
