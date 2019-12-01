import { Injectable } from '@angular/core';
import { User } from "../entities/user";
import { Ticket } from "../entities/ticket";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`, httpOptions).toPromise();
  }

  getUser(id: number): Promise<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`, httpOptions).toPromise();
  }

  getUserTickets(id: number): Promise<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.userUrl}/${id}/tickets`, httpOptions).toPromise();
  }

  createUser(user: User): Promise<User> {
    return this.http.post<User>(`${this.userUrl}/register`, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    }, httpOptions).toPromise();
  }

  addUserTicket(user: User, ticket: Ticket): Promise<Ticket> {
    return this.http.post<Ticket>(`${this.userUrl}/${user.id}/tickets`, {
      id: ticket.id,
      row_num: ticket.row_num,
      seat_num: ticket.seat_num,
      price: ticket.price
    }, httpOptions).toPromise();
  }

  updateUser(user: User): Promise<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      enabled: user.enabled,
      role: user.role
    }, httpOptions).toPromise();
  }

  clearUserTickets(user: User): Promise<Ticket[]> {
    return this.http.put<Ticket[]>(`${this.userUrl}/${user.id}/tickets/clear`, httpOptions).toPromise();
  }

  deleteUser(id): Promise<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`, httpOptions).toPromise();
  }

}
