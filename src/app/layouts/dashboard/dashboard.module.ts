import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { MatTableModule } from '@angular/material/table';
import { CursosModule } from './pages/cursos/cursos.module';
import { RouterModule } from '@angular/router';
import { DetalleAlumnoComponent } from './pages/alumnos/detalle-alumno/detalle-alumno.component';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { HomeModule } from './pages/home/home.module';
import { adminGuard } from '../../core/guards/admin.guard';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    AlumnosModule,
    CursosModule,
    HomeModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'cursos',
        canActivate: [adminGuard],
        loadChildren: () => import('../dashboard/pages/cursos/cursos.module').then((m) => m.CursosModule)

      },
      {
        path: 'alumnos',
        canActivate: [adminGuard],        
        loadChildren: () => import('../dashboard/pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
      },
      {
        path: 'inscripciones',
        canActivate: [adminGuard],    
        loadChildren: () => import('./pages/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule)
      },
      {
        path: 'alumnos/:id',
        component: DetalleAlumnoComponent,
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
