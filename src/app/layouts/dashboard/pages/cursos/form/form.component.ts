import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../../../../models/curso.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnChanges {
  @Output() nuevoCursoCreado: EventEmitter<Curso> = new EventEmitter<Curso>();
  @Output() cursoEditado: EventEmitter<Curso> = new EventEmitter<Curso>();

  @Input() cursoEdit: Curso | null = null;

  formulario: FormGroup;
  nuevoCurso: Curso;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cursoEdit']) {
      this.mostrarDatosEdit();
    }
  }

  private mostrarDatosEdit() {
    this.formulario?.get('nombre').setValue(this.cursoEdit?.nombre);
    this.formulario?.get('cupo').setValue(this.cursoEdit?.cupo);
    this.formulario?.get('fechaFin').setValue(this.cursoEdit?.fechaFin);
    this.formulario?.get('fechaInicio').setValue(this.cursoEdit?.fechaInicio);
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      cupo: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      fechaInicio: [Date, Validators.required],
      fechaFin: [Date, Validators.required],
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      this.nuevoCurso = {
        nombre: this.formulario.value.nombre,
        cupo: this.formulario.value.cupo,
        fechaFin: this.formulario.value.fechaFin.toLocaleDateString('en-GB'),
        fechaInicio:
          this.formulario.value.fechaInicio.toLocaleDateString('en-GB'),
        id: Date.now(),
        profesor: null,
        alumnos: [],
      };

      console.log(this.nuevoCurso, 'CURSO PARA ENVIAR');

      this.nuevoCursoCreado.emit(this.nuevoCurso);
      this.formulario.reset();
    } else {
    }
  }

  guardarEdicion() {
    if (this.formulario.valid) {

      this.nuevoCurso = {
        nombre: this.formulario.value.nombre,
        cupo: this.formulario.value.cupo,
        fechaFin: this.formulario.value.fechaFin,
        fechaInicio: this.formulario.value.fechaInicio,
        id: this.cursoEdit.id,
        profesor: null,
        alumnos: [],
      };
      console.log(this.nuevoCurso, 'FORM EDITADO');

      this.cursoEditado.emit(this.nuevoCurso);
      this.cursoEdit = null;
      this.formulario.reset();
    }
  }

  cancelar() {
    this.cursoEdit = null;
    this.formulario.reset();
  }
}
