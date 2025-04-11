import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from '../components/home/home.component';
import { Electronics } from '../components/electronics/electronics.component';
import { ProductDetail } from '../components/products/product-detail/product-detail.component';


const routes: Routes = [
  { path: '', component: Home },
  { path: 'electronics', component: Electronics },
  { path: 'product/:id', component: ProductDetail },  // Use a single dynamic route
  { path: '**', redirectTo: '' }  // Fallback to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
