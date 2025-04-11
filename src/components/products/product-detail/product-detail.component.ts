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
    {
      title: 'Wireless Earbuds',
      imageUrl: 'assets/images/earbuds.png',
      featureTitle: 'Immerse Yourself',
      featureDescription: 'Immerse yourself in a rich audio experience with these high-quality wireless earbuds. Featuring advanced noise-canceling technology, they block out background sounds so you can focus on your music. With a comfortable fit and long battery life, enjoy hours of uninterrupted listening whether at home or on the go.'
    },
    {
      title: 'Smartwatch',
      imageUrl: 'assets/images/smartwatch.png',
      featureTitle: 'Stay Connected',
      featureDescription: 'Stay connected and track your health with our feature-rich smartwatch. Monitor your workouts, heart rate, and sleep patterns in real-time. Receive notifications from your phone directly on your wrist, helping you manage calls, messages, and apps effortlessly while you\'re active.'
    },
    {
      title: 'Bluetooth Speaker',
      imageUrl: 'assets/images/speaker.png',
      featureTitle: 'Take Your Music Anywhere',
      featureDescription: 'Take your music wherever you go with this portable Bluetooth speaker. Built to be both waterproof and shockproof, it’s perfect for outdoor adventures. Its powerful bass and crystal-clear sound fill any space with high-quality audio, making it a great addition for parties, hikes, and home use.'
    },
    {
      title: 'TV',
      imageUrl: 'assets/images/tv.png',
      featureTitle: 'Experience Entertainment',
      featureDescription: 'Experience entertainment like never before with our stunning 4K UHD TV. Designed for maximum picture clarity, it brings movies, sports, and games to life in vibrant color and detail. Equipped with smart features, this TV also allows you to stream your favorite content from popular apps and connect with ease.'
    },
    {
      title: 'Sail Yacht',
      imageUrl: 'assets/images/yacht.png',
      featureTitle: 'Luxurious Sailing',
      featureDescription: 'Step aboard a premium yacht designed for a luxurious sailing experience. Built with state-of-the-art features and crafted for stability, this yacht provides comfort and style on the open waters. Perfect for personal leisure or high-sea adventures, it promises a unique blend of performance and elegance.'
    },
    {
      title: 'Sailing Ropes',
      imageUrl: 'assets/images/rope.png',
      featureTitle: 'Durability and Grip',
      featureDescription: 'Engineered for durability, these sailing ropes are crafted to withstand the harshest marine conditions. Made from high-quality materials, they offer excellent grip and longevity. Ideal for sailing enthusiasts, these ropes are essential for reliable control and safety while on the water.'
    },
    {
      title: 'Sails',
      imageUrl: 'assets/images/sails.png',
      featureTitle: 'Performance and Speed',
      featureDescription: 'Get exceptional performance with our high-grade sails, built to enhance stability and speed. Designed for both beginner and expert sailors, these sails are made from durable materials to resist tearing and wear. Their innovative design ensures smooth handling even in strong winds, making them essential for serious sailing.'
    },
    {
      title: 'Sailing Smartwatch',
      imageUrl: 'assets/images/sailingwatch.png',
      featureTitle: 'Navigate the Seas',
      featureDescription: 'Navigate the seas with this smartwatch tailored for sailing. Track your speed, location, and weather conditions in real-time, all from your wrist. Waterproof and durable, it’s built for the rigors of marine life, helping you stay informed and connected while on deck or offshore.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router for navigation
    private location: Location
  ) {}

  ngOnInit(): void {
    const productName = this.route.snapshot.paramMap.get('id');

    // Check for null productName
    if (productName) {
      this.product = this.products.find(product => 
        product.title.toLowerCase().replace(/ /g, '-') === productName.toLowerCase()
      );
      
      // no matching
      if (!this.product) {
        this.router.navigate(['']);
      }
    } else {
      // Redirect to home if productName is missing
      this.router.navigate(['']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
