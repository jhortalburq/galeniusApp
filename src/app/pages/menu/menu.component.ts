import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public last_modulo: string | null = '';

  constructor(
        public router: Router,
  ) { }

  ngOnInit() {
    this.last_modulo = localStorage.getItem('last_modulo');

    if (this.last_modulo) {
        this.router.navigate(['/' + this.last_modulo, 'menu']);
    } else {
        this.router.navigate(['/administrador/menu']);
    }
  }
}
