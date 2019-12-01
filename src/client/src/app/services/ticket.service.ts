import { Injectable } from '@angular/core';
import { Ticket } from "../entities/ticket";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketUrl = 'http://localhost:8080/tickets';

  constructor(
    private http: HttpClient
  ) { }

  getTickets(): Promise<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.ticketUrl}`, httpOptions).toPromise();
  }

  getTicket(id: number): Promise<Ticket> {
    return this.http.get<Ticket>(`${this.ticketUrl}/${id}`, httpOptions).toPromise();
  }

  createTicket(ticket: Ticket): Promise<Ticket> {
    return this.http.post<Ticket>(`${this.ticketUrl}`, {
      id: Math.floor(Math.random() * 1000000),
      row_num: ticket.row_num,
      seat_num: ticket.seat_num,
      price: ticket.price,
      user: ticket.user,
      projection: ticket.projection
    }, httpOptions).toPromise();
  }

  updateTicket(ticket: Ticket): Promise<Ticket> {
    return this.http.put<Ticket>(`${this.ticketUrl}/${ticket.id}`, {
      id: Math.floor(Math.random() * 1000000),
      row_num: ticket.row_num,
      seat_num: ticket.seat_num,
      price: ticket.price,
      user: ticket.user,
      projection: ticket.projection
    }, httpOptions).toPromise();
  }

  deleteTicket(id): Promise<Ticket> {
    return this.http.delete<Ticket>(`${this.ticketUrl}/${id}`, httpOptions).toPromise();
  }

}
