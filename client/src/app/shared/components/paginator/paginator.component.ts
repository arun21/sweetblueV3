import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { windowToken } from '@core/factories/window.provider';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less']
})
export class PaginatorComponent implements OnInit {
  @Input() pageCount = 10;
  @Input() currentPage = 1;

  constructor(
    private router: Router,
    @Inject(windowToken) private window: any
  ) { }

  ngOnInit() {
  }

  onPrevPageClick() {
    this.pageClick(this.currentPage - 1);
  }

  onNextPageClick() {
    this.pageClick(this.currentPage + 1);
  }

  pageClick(page) {
    if (page >= 1 && page <= this.pageCount) {
      this.router.navigate([this.window.location.pathname], {
        queryParams: {
          page: page
        },
        queryParamsHandling: 'merge'
      });
      this.currentPage = page;
    }
  }

  createRange() {
    let startNumber = this.currentPage > 3 ? this.currentPage - 3 : 1;
    let items: number[] = [];
    for (var i = startNumber; i < startNumber + 7; i++) {
      items.push(i);
    }
    return items;
  }

}
