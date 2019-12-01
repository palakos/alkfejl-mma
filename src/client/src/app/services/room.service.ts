import { Injectable } from '@angular/core';
import { Room } from "../entities/room";
import { Projection } from "../entities/projection";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomUrl = 'http://localhost:8080/rooms';

  constructor(
    private http: HttpClient
  ) { }

  getRooms(): Promise<Room[]> {
    return this.http.get<Room[]>(`${this.roomUrl}`, httpOptions).toPromise();
  }

  getRoom(id: number): Promise<Room> {
    return this.http.get<Room>(`${this.roomUrl}/${id}`, httpOptions).toPromise();
  }

  getRoomProjections(id: number): Promise<Projection[]> {
    return this.http.get<Projection[]>(`${this.roomUrl}/${id}/projections`, httpOptions).toPromise();
  }

  createRoom(room: Room): Promise<Room> {
    return this.http.post<Room>(`${this.roomUrl}`, {
      id: room.id,
      name: room.name,
      rows: room.rows,
      seats: room.seats
    }, httpOptions).toPromise();
  }

  addRoomProjection(room: Room, projection: Projection): Promise<Projection> {
    return this.http.post<Projection>(`${this.roomUrl}/${room.id}/projections`, {
      id: projection.id,
      time: projection.time,
      isfull: projection.isfull
    }, httpOptions).toPromise();
  }

  updateRoom(room: Room): Promise<Room> {
    return this.http.put<Room>(`${this.roomUrl}/${room.id}`, {
      id: room.id,
      name: room.name,
      rows: room.rows,
      seats: room.seats
    }, httpOptions).toPromise();
  }

  clearRoomProjections(room: Room): Promise<Projection[]> {
    return this.http.put<Projection[]>(`${this.roomUrl}/${room.id}/projections/clear`, httpOptions).toPromise();
  }

  deleteRoom(id): Promise<Room> {
    return this.http.delete<Room>(`${this.roomUrl}/${id}`, httpOptions).toPromise();
  }

}
