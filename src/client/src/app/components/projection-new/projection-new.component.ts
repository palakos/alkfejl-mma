import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { RoomService } from '../../services/room.service';
import { HeroService } from '../../services/hero.service';
import { ProjectionService } from '../../services/projection.service';
import { Movie } from '../../entities/movie';
import { Hero } from '../../entities/hero';
import { Room } from '../../entities/room';
import { Projection } from '../../entities/projection';

@Component({
  selector: 'mma-projection-new',
  templateUrl: './projection-new.component.html',
  styleUrls: ['./projection-new.component.css']
})
export class ProjectionNewComponent implements OnInit {

  projection: Projection = new Projection();
  projections: Projection[] = [];
  movies: Movie[] = [];
  rooms: Room[] = [];
  title: string = 'Új vetítés létrehozása';

  constructor(
    private movieService: MovieService,
    private heroService: HeroService,
    private roomService: RoomService,
    private projectionService: ProjectionService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.movies = await this.movieService.getMovies();
    this.rooms = await this.roomService.getRooms();
  }

  async onFormSave(projection: Projection) {
    this.projections = await this.projectionService.getProjections();
    projection.id = this.projections[this.projections.length - 1].id + 1;
    console.log(projection);
    await this.projectionService.createProjection(projection)
      .then(() => { this.router.navigate(['/projections']); });
    
  }

}
