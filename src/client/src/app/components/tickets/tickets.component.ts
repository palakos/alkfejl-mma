import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';
import { ProjectionService } from '../../services/projection.service';
import { Ticket } from '../../entities/ticket';
import { Projection } from '../../entities/projection';
import { Role } from '../../entities/role';

@Component({
  selector: 'mma-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  tickets: Ticket[];

  constructor(
    public authService: AuthService,
    private ticketService: TicketService,
    private projectionService: ProjectionService
  ) { }

  async ngOnInit() {
    this.tickets = await this.ticketService.getTickets();
    this.tickets = this.tickets.filter(ticket => ticket.user && ticket.user.id == this.authService.user.id);
  }

  async onDeleteClick(id: number) {

    if (confirm("Biztos, hogy törölni akarod a jegyet?")) {

      const deletedTicket: Ticket = await this.ticketService.getTicket(id);

      if (deletedTicket.projection && deletedTicket.projection.isfull == true) {
        const projection: Projection = deletedTicket.projection;
        projection.isfull = false;
        await this.projectionService.updateProjection(projection);
      }


      this.ticketService.deleteTicket(id)
        .then(async () => {
          this.tickets = await this.ticketService.getTickets();
          this.tickets = this.tickets.filter(ticket => ticket.user && ticket.user.id == this.authService.user.id);



        })
    }


  }

}
