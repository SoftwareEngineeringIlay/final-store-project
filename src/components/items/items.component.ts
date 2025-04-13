import { Component, OnInit } from '@angular/core';

interface Item {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-items',                  // ← matches how we'll use it in HTML
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class Items implements OnInit {  // ← export class must match the name
  products: Item[] = [
    { id: 'earbuds',    title: 'Wireless Earbuds',  price: 400, imageUrl: 'assets/images/earbuds.png',   quantity: 0 },
    { id: 'smartwatch', title: 'Smartwatch',        price: 750, imageUrl: 'assets/images/smartwatch.png',quantity: 0 },
    { id: 'speaker',    title: 'Bluetooth Speaker', price: 280, imageUrl: 'assets/images/speaker.png',    quantity: 0 },
    { id: 'tv',         title: 'TV',                price: 1200, imageUrl: 'assets/images/tv.png',         quantity: 0 }
  ];
  total = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    fetch('http://localhost:3000/api/cart')
      .then(r => r.json())
      .then((cart: Record<string,number>) => {
        this.products.forEach(p => p.quantity = cart[p.id] || 0);
        this.calculateTotal();
      });
  }

  add(id: string) {
    fetch('http://localhost:3000/api/cart/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({productId: id})
    })
    .then(r => r.json())
    .then(data => {
      const p = this.products.find(x=>x.id===id)!;
      p.quantity = data.quantity;
      this.calculateTotal();
    });
  }

  remove(id: string) {
    fetch('http://localhost:3000/api/cart/remove', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({productId: id})
    })
    .then(r => r.json())
    .then(data => {
      const p = this.products.find(x=>x.id===id)!;
      p.quantity = data.quantity;
      this.calculateTotal();
    });
  }

  private calculateTotal() {
    this.total = this.products.reduce((sum,p) => sum + p.price*p.quantity, 0);
  }
}
