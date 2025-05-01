import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { NavbarComponent } from './core/navbar/navbar/navbar.component';
import { HomeComponent } from './page/home/home/home.component';
import { LoginComponent } from './core/login/login/login.component';
import { authGuard } from './core/auth.guard';
import { AddListComponent } from './books/add-list/add-list.component';
import { EditListComponent } from './books/edit-list/edit-list.component';
import { SignUpComponent } from './core/login/sign-up/sign-up.component';
import { UserListComponent } from './core/login/user-list/user-list.component';
import { EditUserComponent } from './core/login/edit-user/edit-user.component';
import { IssueListComponent } from './Issue/issue-list/issue-list.component';
import { EditIssueComponent } from './Issue/edit-issue/edit-issue.component';
import { AddIssueComponent } from './Issue/add-issue/add-issue.component';
import { adminGuard } from './core/admin.guard';
import { BookDetailsComponent } from './books/book-details/book-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'book-list',
        component: BookListComponent,
      },
      { path: 'add-list', component: AddListComponent },
      { path: 'edit-list/:id', component: EditListComponent },
      { path: 'user-list', component: UserListComponent, canActivate: [adminGuard]},
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'issue-list', component: IssueListComponent},
      { path: 'edit-issue/:id', component: EditIssueComponent},
      { path: 'add-issue', component: AddIssueComponent },
      { path: 'books/:id', component: BookDetailsComponent, canActivate: [authGuard] },
    ],
  },

  { path: '**', redirectTo: '' },
];
