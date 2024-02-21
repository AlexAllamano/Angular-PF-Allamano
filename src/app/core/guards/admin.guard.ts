import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)

  return authService.authAlumno?.rol === 'ADMIN' ? true : router.createUrlTree(['main', 'home']);
};
