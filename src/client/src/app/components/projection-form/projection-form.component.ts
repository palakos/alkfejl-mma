import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Projection } from '../../entities/projection';
import { Room } from '../../entities/room';
import { Movie } from '../../entities/movie';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mma-projection-form',
  templateUrl: './projection-form.component.html',
  styleUrls: ['./projection-form.component.css'],
  providers: [DatePipe]
})
export class ProjectionFormComponent implements OnInit, OnChanges {

  @Input() projection: Projection;
  @Input() rooms: Room[];
  @Input() movies: Movie[];
  model: Projection;
  
  @Output() onSubmit = new EventEmitter<Projection>();
  title: string = 'Új vetítés hozzáadása';
  date;
  movie;
  room;
  exportTime: ITime;

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    this.date = new FormControl(new Date());
    this.exportTime = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      meriden: 'PM',
      format: 24
    };
  }

  ngOnChanges() {
    this.model = Object.assign({}, this.projection);

    if (this.model.time) {
      console.log(typeof this.model.time);

      this.title = 'Vetítés szerkesztése';
      this.date = new FormControl(new Date(this.model.time));
      this.exportTime = {
        hour: new Date(this.model.time).getHours(),
        minute: new Date(this.model.time).getMinutes(),
        meriden: 'PM',
        format: 24
      };
      if (this.model.movie) {
        this.movie = this.model.movie.id;
      }
      if (this.model.room) {
        this.room = this.model.room.id;
      }
    }

  }

  changeMovie(mv: any) {
    this.model.movie = this.movies.filter(movie => movie.id = mv)[0];
  }

  changeRoom(rm: any) {
    this.model.room = this.rooms.filter(room => room.id = rm)[0];
  }

  onChangeHour(event: ITime) {
    this.exportTime = event;
  }

  submit(form) {
    if (!form.valid) {
      return;
    }
    this.model.time = this.date.value;
    console.log('time ', this.exportTime);
    this.model.time.setHours(this.exportTime.hour);
    this.model.time.setMinutes(this.exportTime.minute);
    this.onSubmit.emit(this.model);
  }

}

export interface ITime {
  hour: number;
  minute: number;
  meriden: string;
  format: number;
}
