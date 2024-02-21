import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AlumnosService } from './alumnos.service';
import { Alumno } from '../../models/alumno.model';
import { enviroment } from '../../../enviroments/entiroment';
import { AlertasService } from './alertas.service';
import { of } from 'rxjs';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let httpMock: HttpTestingController;

  const mockAlumnos: Alumno[] = [
    {
      id: '1',
      nombre: 'Juan',
      edad: 25,
      apellido: 'test',
      correo: 'test',
      cursos: [],
      password: 'test',
      rol: 'ALUMNO',
      sexo: 'masculino',
    },
    {
      id: '2',
      nombre: 'Maria',
      edad: 30,
      apellido: 'test',
      correo: 'test',
      cursos: [],
      password: 'test',
      rol: 'ALUMNO',
      sexo: 'masculino',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlumnosService, AlertasService],
    });
    service = TestBed.inject(AlumnosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Deberia instanciarse', () => {
    expect(service).toBeTruthy();
  });

  it('Debería devolver un arreglo de alumnos', () => {
    
    service.obtenerAlumnos().subscribe((alumnos) => {
      expect(alumnos).toEqual(mockAlumnos);
    });
    const req = httpMock.expectOne(`${enviroment.apiUrl}/alumnos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlumnos);
  });

  it('Debería devolver el mensaje de error "Error al cargar los alumnos, intente de nuevo más tarde" al fallar', () => {
    const errorMessage = 'Error al cargar los alumnos, intente de nuevo más tarde';
    spyOn(service['alertaService'], 'mostrarError');
    service.obtenerAlumnos().subscribe((alumnos) => {
      expect(alumnos).toEqual([]);
      expect(service['alertaService'].mostrarError).toHaveBeenCalledWith(
        errorMessage
      );
    });
    const req = httpMock.expectOne(`${enviroment.apiUrl}/alumnos`);
    req.error(new ErrorEvent(errorMessage));
  });

});
