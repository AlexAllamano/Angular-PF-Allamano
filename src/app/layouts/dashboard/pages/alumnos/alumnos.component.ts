import { Component } from '@angular/core';
import { Alumno } from '../../../../models/alumnos.model';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent {
  alumnos: Alumno[] = [
    {
      id: 1,
      nombre: 'Alex',
      apellido: 'Allamano',
      correo: 'aallamano@gmail.com',
      sexo: 'Masculino',
      edad: 24,
      curso: 'Historia',
    },
    {
      id: 2,
      nombre: 'Constanza',
      apellido: 'Rodríguez',
      correo: 'crodriguez@gmail.com',
      sexo: 'Femenino',
      edad: 20,
      curso: 'Lengua',
    },
  ];

  alumnoAeditar: Alumno = null;

  agregarAlumno(nuevoAlumno: Alumno) {
    console.log(nuevoAlumno)
    this.alumnos = [...this.alumnos, nuevoAlumno]
  }

  editarAlumno(alumno: Alumno){
    this.alumnoAeditar = null;
    this.alumnoAeditar = alumno;
    console.log(alumno, 'ALUMNO A EDITAR')
  }

  guardarEdicion(alumno: Alumno){
    this.alumnos[this.alumnos.indexOf(this.alumnos.find(item => item.id == alumno.id))] = alumno;

    this.alumnos = [...this.alumnos]

    this.alumnoAeditar = null;
  }

  borrarAlumno(idAlumno:number){
    console.log(this.alumnos.find(item => {return item.id == idAlumno}), 'ALUMNO A EDITAR')
    this.alumnos = this.alumnos.filter(item => {return item.id != idAlumno})
  }
}
