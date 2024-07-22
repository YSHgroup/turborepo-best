import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'housing'
        },
      {
        path: 'housing',
        component: HomeComponent,
        title: 'Home page',
        children: [
          {
            path: 'details/:id',
            loadComponent: () => import('./details/details.component').then((c) => c.DetailsComponent),
            title: 'Home details',
          },
        ],
      },
    ],
  },
];
