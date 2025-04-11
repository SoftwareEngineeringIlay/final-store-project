import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class Product {
  @Input() id!: string;
  @Input() title!: string;
  @Input() price!: number;
  @Input() imageUrl!: string;
  @Input() quantity!: number;
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
