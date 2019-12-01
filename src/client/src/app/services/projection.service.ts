import { Injectable } from '@angular/core';
import { Projection } from "../entities/projection";
import { Ticket } from "../entities/ticket";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  private projectionUrl = 'http://localhost:8080/projections';

  constructor(
    private http: HttpClient
  ) { }

  getProjections(): Promise<Projection[]> {
    return this.http.get<Projection[]>(`${this.projectionUrl}`, httpOptions).toPromise();
  }

  getProjection(id: number): Promise<Projection> {
    return this.http.get<Projection>(`${this.projectionUrl}/${id}`, httpOptions).toPromise();
  }

  getProjectionTickets(id: number): Promise<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.projectionUrl}/${id}/tickets`, httpOptions).toPromise();
  }

  createProjection(projection: Projection): Promise<Projection> {
    return this.http.post<Projection>(`${this.projectionUrl}`, {
      id: projection.id,
      time: projection.time,
      isfull: projection.isfull,
      room: projection.room,
      movie: projection.movie
    }, httpOptions).toPromise();
  }

  addProjectionTicket(projection: Projection, ticket: Ticket): Promise<Ticket> {
    return this.http.post<Ticket>(`${this.projectionUrl}/${projection.id}/tickets`, {
      id: ticket.id,
      row_num: ticket.row_num,
      seat_num: ticket.seat_num,
      price: ticket.price
    }, httpOptions).toPromise();
  }

  updateProjection(projection: Projection): Promise<Projection> {
    return this.http.put<Projection>(`${this.projectionUrl}/${projection.id}`, {
      id: projection.id,
      time: projection.time,
      isfull: projection.isfull,
      room: projection.room,
      movie: projection.movie
    }, httpOptions).toPromise();
  }

  clearProjectionTickets(projection: Projection): Promise<Ticket[]> {
    return this.http.put<Ticket[]>(`${this.projectionUrl}/${projection.id}/tickets/clear`, httpOptions).toPromise();
  }

  deleteProjection(id: number): Promise<Projection> {
    return this.http.delete<Projection>(`${this.projectionUrl}/${id}`, httpOptions).toPromise();
  }

}
