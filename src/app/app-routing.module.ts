import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from '../components/home/home.component';
import { Items } from '../components/items/items.component';
import { ProductDetail } from '../components/products/product-detail/product-detail.component';


const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Items },
  { path: 'product/:id', component: ProductDetail },  // Use a single dynamic route
  { path: '**', redirectTo: '' }  // Fallback to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
