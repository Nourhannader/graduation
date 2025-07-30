import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const _platformId = inject(PLATFORM_ID);
  const _router = inject(Router);
  if (isPlatformBrowser(_platformId)) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
      _router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data?.['roles'] as string[];
    if (allowedRoles && !allowedRoles.includes(userRole || '')) {
      _router.navigate(['/404']);
      return false;
    }

    return true;
  }

  return false;
};
