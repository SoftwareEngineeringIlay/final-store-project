import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Item {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class Items implements OnInit {
  products: Item[] = [
    { id: 'earbuds',    title: 'Wireless Earbuds',  price: 400, imageUrl: 'assets/images/earbuds.png',   quantity: 0 },
    { id: 'smartwatch', title: 'Smartwatch',        price: 750, imageUrl: 'assets/images/smartwatch.png',quantity: 0 },
    { id: 'speaker',    title: 'Bluetooth Speaker', price: 280, imageUrl: 'assets/images/speaker.png',    quantity: 0 },
    { id: 'tv',         title: 'TV',                price: 1200, imageUrl: 'assets/images/tv.png',         quantity: 0 }
  ];
  total = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    this.http.get<Record<string,number>>('/api/cart')
      .subscribe(cart => {
        this.products.forEach(p => p.quantity = cart[p.id] || 0);
        this.calculateTotal();
      });
  }

  add(id: string) {
    this.http.post<{ quantity: number }>('/api/cart/add', { productId: id })
      .subscribe(data => {
        this.updateQuantity(id, data.quantity);
      });
  }

  remove(id: string) {
    this.http.post<{ quantity: number }>('/api/cart/remove', { productId: id })
      .subscribe(data => {
        this.updateQuantity(id, data.quantity);
      });
  }

  private updateQuantity(id: string, qty: number) {
    const p = this.products.find(x => x.id === id)!;
    p.quantity = qty;
    this.calculateTotal();
  }

  private calculateTotal() {
    this.total = this.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}
