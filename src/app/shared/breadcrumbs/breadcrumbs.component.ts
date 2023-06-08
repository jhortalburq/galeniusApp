import { Component, OnInit } from '@angular/core';

import { BreadcrumbsService } from '../../services/services.index';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(
    public breadcrumbService: BreadcrumbsService,
  ) { }

  ngOnInit(): void {
  }

}
