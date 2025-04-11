import { Component, OnInit } from '@angular/core';

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class Products implements OnInit {
  products: Product[] = [
    { id: 'earbuds',     title: 'Wireless Earbuds', price: 10, imageUrl: 'assets/images/earbuds.png',     quantity: 0 },
    { id: 'smartwatch',  title: 'Smartwatch',      price: 20, imageUrl: 'assets/images/smartwatch.png',  quantity: 0 },
    { id: 'speaker',     title: 'Bluetooth Speaker', price: 30, imageUrl: 'assets/images/speaker.png',      quantity: 0 },
    { id: 'tv',          title: 'TV',              price: 40, imageUrl: 'assets/images/tv.png',           quantity: 0 }
  ];
  total = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    fetch('http://localhost:3000/api/cart')
      .then(res => res.json())
      .then((cart: Record<string, number>) => {
        this.products.forEach(p => p.quantity = cart[p.id] || 0);
        this.calculateTotal();
      });
  }

  add(id: string) {
    fetch('http://localhost:3000/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    })
    .then(res => res.json())
    .then(data => {
      const p = this.products.find(x => x.id === id)!;
      p.quantity = data.quantity;
      this.calculateTotal();
    });
  }

  remove(id: string) {
    fetch('http://localhost:3000/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    })
    .then(res => res.json())
    .then(data => {
      const p = this.products.find(x => x.id === id)!;
      p.quantity = data.quantity;
      this.calculateTotal();
    });
  }

  private calculateTotal() {
    this.total = this.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}
