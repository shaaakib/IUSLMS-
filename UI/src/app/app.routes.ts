import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { NavbarComponent } from './core/navbar/navbar/navbar.component';
import { HomeComponent } from './page/home/home/home.component';
import { LoginComponent } from './core/login/login/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'book-list',
        component: BookListComponent
      }
    ]
  },

  { path: '**', redirectTo: '' },
];
