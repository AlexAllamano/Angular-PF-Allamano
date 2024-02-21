import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoComponent } from './listado.component';
import { Curso } from '../../../../../models/curso.model';
import { MatTableDataSource } from '@angular/material/table';
import { HelpersModule } from '../../../../../helpers/helpers.module';

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoComponent],
      imports: [HelpersModule], 
      providers: [], 
    }).compileComponents(); 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente debe instanciarse', () => {
    expect(component).toBeTruthy();
  });

  it('Se deben setear los cursos al dataSource de la tabla', () => {
    const cursos: Curso[] = [
      { id: 1, nombre: 'Curso 1', cupo: 20, fechaInicio: new Date(), fechaFin: new Date(), alumnos: [], profesor: null },
      { id: 2, nombre: 'Curso 2', cupo: 15, fechaInicio: new Date(), fechaFin: new Date(), alumnos: [], profesor: null },
    ];
    component.cursos = cursos;
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(cursos);
  });

  it('la funcion "editarCurso" debe emitir un curso modificado', () => {
    const curso: Curso = { id: 1, nombre: 'Curso 1', cupo: 20, fechaInicio: new Date(), fechaFin: new Date(), alumnos: [], profesor: null };
    spyOn(component.editarCurso, 'emit');
    component.editarCurso.emit(curso);
    expect(component.editarCurso.emit).toHaveBeenCalledWith(curso);
  });

  it('la funcion "borrarCurso" debe emitir un curso borrado', () => {
    const idCurso = 1;
    spyOn(component.borrarCurso, 'emit');
    component.borrarCurso.emit(idCurso);
    expect(component.borrarCurso.emit).toHaveBeenCalledWith(idCurso);
  });
});