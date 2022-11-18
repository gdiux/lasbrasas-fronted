import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

// COMPONENTS
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ReservacionComponent } from './reservacion/reservacion.component';
import { DomicilioComponent } from './domicilio/domicilio.component';
import { BreadcrumsComponent } from '../shared/breadcrums/breadcrums.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservaComponent } from './reserva/reserva.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ReservacionComponent,
    DomicilioComponent,
    BreadcrumsComponent,
    ProductosComponent,
    ReservaComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule
  ]
})
export class PagesModule { }
