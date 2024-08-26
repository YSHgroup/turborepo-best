import { Routes } from '@angular/router';

import { HomeComponent } from './tutorial/home/home.component';
import { KanbanMainComponent } from './kanban/kanban-main/kanban-main.component';
import { ChatMainComponent } from './chat/chat-main/chat-main.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'housing',
      },
      {
        path: 'housing',
        component: HomeComponent,
        title: 'Home page',
        children: [
          {
            path: 'details/:id',
            loadComponent: () =>
              import('./tutorial/details/details.component').then(
                (c) => c.DetailsComponent,
              ),
            title: 'Home details',
          },
        ],
      },
      {
        path: 'kanban',
        component: KanbanMainComponent,
        title: 'Kanban page',
      },
      {
        path: 'chatting',
        component: ChatMainComponent,
        title: 'Chatting page'
      }
    ],
  },
];
