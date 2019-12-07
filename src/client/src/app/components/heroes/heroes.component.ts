import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../entities/hero';
import { Role } from '../../entities/role';

@Component({
  selector: 'mma-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(public authService: AuthService, private heroService: HeroService) { }

  async ngOnInit() {
    this.heroes = await this.heroService.getHeroes();
    
  }

  isAdmin(): boolean {
    return this.authService.user.role.toString() == Role[2];
  }

}
