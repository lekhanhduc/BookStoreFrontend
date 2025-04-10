import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', component: BooksComponent },
    { path: 'book-detail/:id', component: BookDetailsComponent, data: { showBanner: false } }, // 1. Không hiện thị banner
    { path: 'sign-in', component: LoginComponent, data: { hideLayout: true } },
    { path: 'sign-up', component: RegisterComponent, data: { hideLayout: true } },
    { path: 'bio', component: BioComponent, data: { showBanner: false } },
    { path: 'contact', component: ContactComponent, data: { showBanner: false } },
    { path: 'profile', component: ProfileComponent, data: { showBanner: false } },
];
