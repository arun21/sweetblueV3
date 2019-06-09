import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() onHeartClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addProductToCart() {
    this.onHeartClick.emit(this.product._id);
  }

}
