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



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ReservacionComponent,
    DomicilioComponent,
    BreadcrumsComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
