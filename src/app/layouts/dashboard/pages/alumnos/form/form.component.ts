import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../../../../models/alumnos.model';

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
    this.formulario?.get('curso').setValue(this.alumnoEdit?.curso);
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
      curso: ['', Validators.required],
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      
        this.nuevoAlumno = {
          nombre: this.formulario.value.nombre,
          apellido: this.formulario.value.apellido,
          curso: this.formulario.value.curso,
          correo: this.formulario.value.correo,
          id: Date.now(),
          edad: this.formulario.value.edad,
          sexo: this.formulario.value.sexo,
        };
      this.nuevoAlumnoCreado.emit(this.nuevoAlumno);
      this.formulario.reset();
    }
  }

  guardarEdicion() {
    if (this.formulario.valid) {

      console.log(this.alumnoEdit.id, 'ID DEL ALUMNO EDITADO')
      
      this.nuevoAlumno = {
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        curso: this.formulario.value.curso,
        correo: this.formulario.value.correo,
        id: this.alumnoEdit.id,
        edad: this.formulario.value.edad,
        sexo: this.formulario.value.sexo,
      };

      console.log(this.nuevoAlumno)

      this.alumnoEditado.emit(this.nuevoAlumno);
      this.formulario.reset();
    }
  }

  cancelar() {
    this.alumnoEdit = null;
    this.formulario.reset();
  }

}
