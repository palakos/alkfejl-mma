import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatCardModule, MatGridListModule, MatListModule, MatTableModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MoviesComponent } from './components/movies/movies.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectionsComponent } from './components/projections/projections.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroEditComponent } from './components/hero-edit/hero-edit.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroNewComponent } from './components/hero-new/hero-new.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { MovieNewComponent } from './components/movie-new/movie-new.component';
import { ProjectionEditComponent } from './components/projection-edit/projection-edit.component';
import { ProjectionNewComponent } from './components/projection-new/projection-new.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ProjectionFormComponent } from './components/projection-form/projection-form.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';







@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HomeComponent,
    ProjectionsComponent,
    TicketsComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    HeroesComponent,
    HeroEditComponent,
    HeroFormComponent,
    HeroNewComponent,
    MovieDetailComponent,
    MovieEditComponent,
    MovieNewComponent,
    ProjectionEditComponent,
    ProjectionNewComponent,
    TicketNewComponent,
    UserNewComponent,
    MovieFormComponent,
    ProjectionFormComponent,
    HeroDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialTimePickerModule,
    FlexLayoutModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
