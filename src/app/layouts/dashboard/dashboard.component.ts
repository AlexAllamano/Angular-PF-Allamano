import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alumno } from '../../models/alumno.model';
import { selectAutAlumno } from '../../core/store/auth/selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller: boolean = false;

  authUser$: Observable<Alumno | null>

  constructor(private authService: AuthService, private store: Store){
    this.authUser$ = this.store.select(selectAutAlumno)
  }

  logout(){
    this.authService.logout();
  }
}
