import { Routes } from '@angular/router';
import { LEARNING_ROUTES } from './learning/routes';
import { HomeComponent } from './pages/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { GolfStore } from '@shared/golf.store';

export const routes: Routes = [
  // ok, all the routes for the app...
  {
    path: '', // '', '/learning'
    component: HomeComponent,
    pathMatch: 'prefix',
    providers: [GolfStore],
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      // },
      ...LEARNING_ROUTES,
      {
        // a catchall has to be last.
        path: '**',
        component: DashboardComponent,
      },
    ],
  },
];
