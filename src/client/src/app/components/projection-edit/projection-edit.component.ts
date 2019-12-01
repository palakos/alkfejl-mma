import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectionService } from '../../services/projection.service';
import { RoomService } from '../../services/room.service';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { Projection } from '../../entities/projection';
import { Room } from '../../entities/room';
import { Movie } from '../../entities/movie';

@Component({
  selector: 'mma-projection-edit',
  templateUrl: './projection-edit.component.html',
  styleUrls: ['./projection-edit.component.css']
})
export class ProjectionEditComponent implements OnInit {

  id: number = null;
  projection: Projection = new Projection();
  rooms: Room[] = [];
  movies: Movie[] = [];
  title: string = 'Vetítés szerkesztése';

  constructor(
    private route: ActivatedRoute,
    private projectionService: ProjectionService,
    private roomService: RoomService,
    private movieService: MovieService,
    private router: Router,
    private authService: AuthService
  ) { }


  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.projection = await this.projectionService.getProjection(this.id);
      this.rooms = await this.roomService.getRooms();
      this.movies = await this.movieService.getMovies();
    }
  }

  async onFormSave(projection: Projection) {
    console.log(projection);
    await this.projectionService.updateProjection(projection);
    this.router.navigate(['/projections']);

  }

}
