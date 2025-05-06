import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './shared/login/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { authGuard } from './core/guards/auth.guard';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { AddListComponent } from './features/books/add-list/add-list.component';
import { EditListComponent } from './features/books/edit-list/edit-list.component';
import { IssueListComponent } from './features/Issue/issue-list/issue-list.component';
import { EditIssueComponent } from './features/Issue/edit-issue/edit-issue.component';
import { AddIssueComponent } from './features/Issue/add-issue/add-issue.component';
import { BookDetailsComponent } from './features/books/book-details/book-details.component';
import { adminGuard } from './core/guards/admin.guard';
import { SignUpComponent } from './shared/signup/sign-up/sign-up.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { VerifyOtpComponent } from './shared/verify-otp/verify-otp.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },

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
