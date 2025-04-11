import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class Product {
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
  @Input() productLink!: string;
}
