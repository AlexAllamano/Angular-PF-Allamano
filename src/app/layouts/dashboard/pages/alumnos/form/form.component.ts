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
import { Alumno } from '../../../../../models/alumno.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnChanges {
  @Output() nuevoAlumnoCreado: EventEmitter<Alumno> =
    new EventEmitter<Alumno>();
  @Output() alumnoEditado: EventEmitter<Alumno> = new EventEmitter<Alumno>();

  @Input() alumnoEdit: Alumno | null = null;

  formulario: FormGroup;
  nuevoAlumno: Alumno;

  cursos = ['Matemática', 'Historia', 'Lengua', 'Ciencia', 'Computación'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alumnoEdit']) {
      this.mostrarDatosEdit();
    }
  }

  private mostrarDatosEdit() {
    this.formulario?.get('nombre').setValue(this.alumnoEdit?.nombre);
    this.formulario?.get('apellido').setValue(this.alumnoEdit?.apellido);
    this.formulario?.get('correo').setValue(this.alumnoEdit?.correo);
    this.formulario?.get('edad').setValue(this.alumnoEdit?.edad);
    this.formulario?.get('sexo').setValue(this.alumnoEdit?.sexo);
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      this.nuevoAlumno = {
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        cursos: [],
        correo: this.formulario.value.correo,
        rol: 'ALUMNO',
        password: '1234',
        id: Date.now().toString(),
        edad: this.formulario.value.edad,
        sexo: this.formulario.value.sexo,
        token: ''
      };
      this.nuevoAlumnoCreado.emit(this.nuevoAlumno);
      this.formulario.reset();
    } else {
    }
  }

  guardarEdicion() {
    if (this.formulario.valid) {
      this.nuevoAlumno = {
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        cursos: [],
        correo: this.formulario.value.correo,
        password: '1234',
        rol: 'ALUMNO',
        id: this.alumnoEdit.id,
        edad: this.formulario.value.edad,
        sexo: this.formulario.value.sexo,
        token: ''
      };

      this.alumnoEditado.emit(this.nuevoAlumno);
      this.alumnoEdit = null;
      this.formulario.reset();
    }
  }

  cancelar() {
    this.alumnoEdit = null;
    this.formulario.reset();
  }
}
