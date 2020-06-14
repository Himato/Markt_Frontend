import { ProductResult } from './../shared/models/product.models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-result-list',
  templateUrl: './product-result-list.component.html',
  styleUrls: ['./product-result-list.component.css']
})
export class ProductResultListComponent {
  @Input() products: ProductResult[];
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  times = 0;

  constructor() { }

  onNext() {
    this.times++;
    this.next.emit(null);
  }

  onLast() {
    this.times--;
    this.previous.emit(null);
  }
}
