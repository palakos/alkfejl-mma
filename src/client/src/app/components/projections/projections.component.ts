import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectionService } from '../../services/projection.service';
import { Projection } from '../../entities/projection';
import { Ticket } from '../../entities/ticket';
import { Role } from '../../entities/role';

@Component({
  selector: 'mma-projections',
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.css']
})
export class ProjectionsComponent implements OnInit {

  projections: Projection[];
  selectedProjection: Projection;

  constructor(public authService: AuthService, private projectionService: ProjectionService) { }

  async ngOnInit() {
    this.projections = await this.projectionService.getProjections();
    this.projections.sort((a, b) => (a.time > b.time) ? 1 : -1);
  }

  isAdmin(): boolean {
    return this.authService.user.role.toString() == Role[2];
  }

  onSelectProjection(projection) {
    this.selectedProjection = projection;
  }

  onDeleteClick(id: number) {

    if (confirm("Biztos, hogy törölni akarod a vetítést?")) {
      this.projectionService.deleteProjection(id)
        .then(async () => {
          this.selectedProjection = null;
          this.projections = await this.projectionService.getProjections();
        })
    }

 
  }
}
