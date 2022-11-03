import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DomicilioComponent } from './domicilio/domicilio.component';
import { ReservacionComponent } from './reservacion/reservacion.component';
import { ProductosComponent } from './productos/productos.component';
import { ReservaComponent } from './reserva/reserva.component';

const routes: Routes = [
    
    { path: 'inicio', component: HomeComponent, data:{ titulo: 'Inicio' } },
    { path: 'domicilio', component: DomicilioComponent, data:{ titulo: 'Domicilio' } },
    { path: 'reservacion', component: ReservacionComponent, data:{ titulo: 'Reservación' } },
    { path: 'reserva/:id', component: ReservaComponent, data:{ titulo: 'Reservación' } },
    { path: 'menu', component: MenuComponent, data:{ titulo: 'Menu' } }, 
    { path: 'menu/:productos/:id', component: ProductosComponent },
      
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
