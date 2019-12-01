import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Role } from '../../entities/role';
import { Hero } from "../../entities/hero";
import { AuthService } from '../../services/auth.service';
import { HeroService } from "../../services/hero.service";

@Component({
  selector: 'mma-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero = new Hero();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private heroService: HeroService
  ) { }

  async ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hero = await this.heroService.getHero(id);
  }

  isAdmin(): boolean {
    return this.authService.user.role.toString() == Role[2];
  }

  onDeleteClick(id: number) {
    this.heroService.deleteHero(id)
      .then(async () => {
        await this.router.navigate(['/heroes']);
      })
  }

}
