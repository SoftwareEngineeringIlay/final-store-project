import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';

import { Home } from '../components/home/home.component';
import { Electronics } from '../components/electronics/electronics.component';
import { Product } from '../components/products/product/product.component';
import { ProductDetail } from '../components/products/product-detail/product-detail.component';
import { ItemsComponent } from '../components/items/items.component';

@NgModule({
  declarations: [
    App,
    Product,
    Home,
    Items,
    ProductDetail,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})

export class AppModule { }
