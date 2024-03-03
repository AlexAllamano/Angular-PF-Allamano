import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)

  return authService.verificarToken().pipe(map((verificado) => verificado ? true : router.createUrlTree(['auth', 'login'])))

};
