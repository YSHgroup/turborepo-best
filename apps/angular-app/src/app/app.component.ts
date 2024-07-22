import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'homes';
  navlinks = [
    {
      name: 'Housing',
      path: '/housing'
    },
    {
      name: 'Kanban',
      path: '/kanban'
    },
    {
      name: 'Housing',
      path: '#'
    },
    {
      name: 'Housing',
      path: '#'
    }
  ]

}
  