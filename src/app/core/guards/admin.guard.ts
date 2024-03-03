import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectAutAlumno } from '../store/auth/selectors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectAutAlumno).pipe(
    map((alumno) => {
      return alumno?.rol === 'ADMIN'
        ? true
        : router.createUrlTree(['main', 'home']);
    })
  );
};
