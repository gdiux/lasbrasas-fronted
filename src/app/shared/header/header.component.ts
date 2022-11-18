import { Component, OnInit } from '@angular/core';

declare function themeFunction(): any;

// MODELS
import { Carrito } from 'src/app/models/carrito.model';

// SERVICES
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public carrito!: Carrito;

  constructor(  private carritoService: CarritoService) { 

    this.carrito = carritoService.carrito;

  }

  ngOnInit(): void { 

    themeFunction();

  }

  /** ================================================================
   *   ELIMINAR PRODUCTOS AL CARRITO
  ==================================================================== */
  deleteProductCart(i: number){
    this.carritoService.deleteProduct(i);
  }

  // FIN DE LA CLASE
}
