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
  @Input() times: number; // indicates the number of times requested

  constructor() { }

  onNext() {
    this.next.emit(null);
  }

  onLast() {
    this.previous.emit(null);
  }
}
