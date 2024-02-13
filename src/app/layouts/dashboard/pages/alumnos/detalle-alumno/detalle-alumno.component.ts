import { Component } from '@angular/core';
import { AlumnosService } from '../../../../../core/services/alumnos.service';
import { Alumno } from '../../../../../models/alumno.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../../core/services/loading.service';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrl: './detalle-alumno.component.scss'
})
export class DetalleAlumnoComponent {

  alumno: Alumno = null;

  constructor(private alumnosService: AlumnosService, private route: ActivatedRoute, private loadingService: LoadingService) {}

  ngOnInit(): void {

    this.loadingService.estaCargando(true);

    let idAlumno = this.route.snapshot.params['id']

    this.alumnosService.obtenerAlumnoID(idAlumno).subscribe({
      next: (data) => {
        this.alumno = data
      },
      complete: () =>{
        this.loadingService.estaCargando(false);
      }
    })


    
  }



}
