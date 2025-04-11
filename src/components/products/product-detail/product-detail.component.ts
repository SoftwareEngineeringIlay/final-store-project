import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetail implements OnInit {
  product: any;
  private products = [
    { title: 'Wireless Earbuds',    imageUrl: 'assets/images/earbuds.png',     featureTitle: 'Immerse Yourself',    featureDescription: '…' },
    { title: 'Smartwatch',          imageUrl: 'assets/images/smartwatch.png',  featureTitle: 'Stay Connected',     featureDescription: '…' },
    { title: 'Bluetooth Speaker',   imageUrl: 'assets/images/speaker.png',      featureTitle: 'Take Your Music',    featureDescription: '…' },
    { title: 'TV',                  imageUrl: 'assets/images/tv.png',           featureTitle: 'Experience',        featureDescription: '…' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product = this.products.find(p =>
      p.title.toLowerCase().replace(/ /g, '-') === id.toLowerCase()
    );
    if (!this.product) this.router.navigate(['']);
  }

  goBack(): void {
    this.location.back();
  }
}
