import { inject } from '@angular/core';
import { UserStore } from './user.store';
import { Router } from '@angular/router';

// return a boolean, signal(boolean), observable(boolean), route tree
export function userLoggedInGuard() {
  return () => {
    const router = inject(Router);
    const url = router.url;
    return inject(UserStore).userLoggedIn();
    // ? router.createUrlTree([url])
    // : false;
  };
}
