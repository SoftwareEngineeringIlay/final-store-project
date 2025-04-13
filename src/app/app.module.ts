import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';

import { Home } from '../components/home/home.component';
import { Items } from '../components/items/items.component';
import { Product } from '../components/products/product/product.component';
import { ProductDetail } from '../components/products/product-detail/product-detail.component';
import { TodoComponent } from '../components/todo/todo.component';

@NgModule({
  declarations: [
    App,
    Home,
    Items,
    Product,
    ProductDetail,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
