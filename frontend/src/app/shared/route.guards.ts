import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { UserStore } from './user.store';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { first, map, tap } from 'rxjs';

// return a boolean, signal(boolean), observable(boolean), route tree
export function userLoggedInGuard(): CanActivateFn {
  let url = '';
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const userStore = inject(UserStore);
    const obs = toObservable(userStore.userLoggedIn);
    url = state.url;
    if (userStore.userLoggedIn()) {
      return true;
    } else {
      router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  };
}
