import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type ApiResourceStates = 'idle' | 'pending' | 'fulfilled' | 'error';
type UserState = {
  userName: string;
  status: ApiResourceStates;
};
const initialState: UserState = {
  userName: '',
  status: 'idle',
};
export const UserStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    // this is an injection context.
    const client = inject(HttpClient);
    return {
      _logInUser: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { status: 'pending' })),
          switchMap(() =>
            client.get<{ userName: string }>('/api/user-info').pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, {
                    userName: response.userName,
                    status: 'fulfilled',
                  });
                },
                error: (error: HttpErrorResponse) => {
                  // log it, send a message to another api that we've got a hoxx0r here
                  patchState(store, { userName: '', status: 'error' });
                },
              })
            )
          )
        )
      ),
    };
  }),

  withComputed((store) => {
    return {
      userLoggedIn: computed(() => store.userName() !== ''),
    };
  }),
  withHooks((store) => {
    return {
      onInit() {
        store._logInUser();
      },
    };
  })
);
