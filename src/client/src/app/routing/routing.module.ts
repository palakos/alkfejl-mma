import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { LogoutComponent } from '../components/logout/logout.component';

import { HomeComponent } from '../components/home/home.component';
import { MoviesComponent } from '../components/movies/movies.component';
import { MovieDetailComponent } from '../components/movie-detail/movie-detail.component';
import { MovieNewComponent } from '../components/movie-new/movie-new.component';
import { HeroesComponent } from '../components/heroes/heroes.component';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { HeroNewComponent } from '../components/hero-new/hero-new.component';
import { HeroEditComponent } from '../components/hero-edit/hero-edit.component';
import { MovieEditComponent } from '../components/movie-edit/movie-edit.component';
import { ProjectionsComponent } from '../components/projections/projections.component';
import { ProjectionNewComponent } from '../components/projection-new/projection-new.component';
import { ProjectionEditComponent } from '../components/projection-edit/projection-edit.component';
import { TicketsComponent } from '../components/tickets/tickets.component';
import { TicketNewComponent } from '../components/ticket-new/ticket-new.component';
import { UserNewComponent } from '../components/user-new/user-new.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: UserNewComponent
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies/new',
    component: MovieNewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id/edit',
    component: MovieEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'heroes/new',
    component: HeroNewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'heroes/:id',
    component: HeroDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'heroes/:id/edit',
    component: HeroEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'projections',
    component: ProjectionsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
  path: 'projections/new',
  component: ProjectionNewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
{
  path: 'projections/:id/edit',
    component: ProjectionEditComponent,
    canActivate: [AuthGuard],
    data: {
    roles: ['ROLE_ADMIN']
  }
},
  {
    path: 'projections/:id/buyticket',
    component: TicketNewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mytickets',
    component: TicketsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
