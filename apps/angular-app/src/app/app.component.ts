import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

import { HomeComponent } from './tutorial/home/home.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'homes';
  navlinks = [
    {
      name: 'Housing',
      path: '/housing',
    },
    {
      name: 'Kanban',
      path: '/kanban',
    },
    {
      name: 'Chatting',
      path: '/chatting',
    },
    {
      name: 'Housing',
      path: '#',
    },
  ];
  logos = ['logo-home.svg', 'logo-kanban.svg'];
  currentUrl: string = '';
  logo: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
        if (this.currentUrl.startsWith('/housing')) {
          this.logo = this.logos[0];
        } else if (this.currentUrl.startsWith('/kanban')) {
          this.logo = this.logos[1];
        }
      });
  }
}
