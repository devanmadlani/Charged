import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app-core';

export const redirectGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.user()) {
    const sessionUser = await auth.loadUserFromSession();
    auth.setUser(sessionUser);
  }

  if (!auth.user()) {
    return true; // Allow access to login page
  }

  const role = auth.userRole();

  if (role === 'admin') {
    router.navigateByUrl('/admin');
  } else {
    router.navigateByUrl('/tabs/home');
  }

  return false; // Block access to login if already logged in
};
