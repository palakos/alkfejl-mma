import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectionService } from '../../services/projection.service';
import { RoomService } from '../../services/room.service';
import { MovieService } from '../../services/movie.service';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Projection } from '../../entities/projection';
import { Ticket } from '../../entities/ticket';
import { Room } from '../../entities/room';
import { Movie } from '../../entities/movie';


@Component({
  selector: 'mma-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  id: number = null;
  projection: Projection = new Projection();
  tickets: Ticket[] = [];
  rows: number = 0;
  seats: number = 0;
  title: string = 'Jegyvásárlás';
  buys: number[][] = [[], []];

  constructor(
    private route: ActivatedRoute,
    private projectionService: ProjectionService,
    private roomService: RoomService,
    private movieService: MovieService,
    private ticketService: TicketService,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;
      this.projection = await this.projectionService.getProjection(this.id);
      this.tickets = await this.projectionService.getProjectionTickets(this.id);
      this.rows = this.projection.room.rows;
      this.seats = this.projection.room.seats;
      for (let i = 0; i < this.rows; i++) {
        this.buys[i] = [];
        for (let j = 0; j < this.seats; j++) {
          this.buys[i][j] = -1;
        }
      }

      this.tickets.forEach(ticket => {
        this.buys[ticket.row_num - 1][ticket.seat_num - 1] = 0;
      })

    }
  }


  arrayN(n: number): number[] {
    return [...Array(n).keys()];
  }

  switchTicket(i: number, j: number) {

    if (this.buys[i][j] == -1) {
      this.buys[i][j] = 1;
    }
    else if (this.buys[i][j] == 1) {
      this.buys[i][j] = -1;
    }
    
  }

  async buyTickets() {
        
    let ticket = new Ticket();
    ticket.price = 1400;
    ticket.projection = this.projection;
    ticket.user = this.authService.user;

    this.router.navigate(['/movies'])
      .then(async () => {

        for (let i = 0; i < this.buys.length; i++) {
          for (let j = 0; j < this.buys[i].length; j++) {
            if (this.buys[i][j] == 1) {
              ticket.row_num = i + 1;
              ticket.seat_num = j + 1;
              await this.ticketService.createTicket(ticket);
            }
          }
        }

        let projectionTickets = await this.projectionService.getProjectionTickets(this.projection.id);

        if (projectionTickets.length == this.projection.room.rows * this.projection.room.seats) {
          this.projection.isfull = true;
          await this.projectionService.updateProjection(this.projection);
        }

      })



    

  }

}
