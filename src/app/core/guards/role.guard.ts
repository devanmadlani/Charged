import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app-core';
import { UserRole } from '@models/user.model';

export const roleGuard: CanActivateFn = async (route, state) => {
  // const auth = inject(AuthService);
  // const router = inject(Router);

  // if (!auth.user()) {
  //   const sessionUser = await auth.loadUserFromSession();
  //   auth.setUser(sessionUser);
  // }

  // const allowedRoles = (route.data?.['allowedRoles'] as UserRole[]) ?? [];
  // const currentRole = auth.userRole();

  // if (!auth.user()) {
  //   router.navigate(['/login'], {
  //     queryParams: { returnUrl: state.url },
  //   });
  //   return false;
  // }

  // if (!currentRole || !allowedRoles.includes(currentRole)) {
  //   const fallback = currentRole === 'admin' ? '/admin' : '/tabs/home';
  //   router.navigateByUrl(fallback);
  //   return false;
  // }

  return true;
};
