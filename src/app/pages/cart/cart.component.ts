import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MapGeocoder} from '@angular/google-maps';

// MODELS
import { Carrito } from 'src/app/models/carrito.model';
import { Ubicaciones } from 'src/app/models/ubicaciones.model';

// SERVICES
import { CarritoService } from '../../services/carrito.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  
  public carrito!: Carrito;
  public ubicaciones: Ubicaciones[] = [];
  public ubicacion!: Ubicaciones;
  constructor(  private carritoService: CarritoService) { 

    this.carrito = carritoService.carrito;

  }

  ngOnInit(): void {

    if (localStorage.getItem('ubicaciones')) {
      this.ubicaciones = JSON.parse(localStorage.getItem('ubicaciones')!) || [];

      if (this.ubicaciones.length > 0) {
        this.selectUbicacion(0);
      }

    }

  }

  /** =====================================================================
   *  SELECCIONAR UBICACION
  =========================================================================*/
  public restaurante = {lat: 7.060078657974728, lng: -73.16779129207134};
  public center = this.restaurante;
  public zoom = 16;
  public markerOptions: google.maps.MarkerOptions = {draggable: false};
  public markerPositions: google.maps.LatLngLiteral = this.center;

  selectUbicacion(i: any){ 

    i = Number(i);

    this.ubicacion = this.ubicaciones[i];
    
    this.center = {lat: Number(this.ubicacion.localizacion.lat), lng: Number(this.ubicacion.localizacion.lng)};

    this.markerPositions = this.center;

  }

  /** ================================================================
   *   AGREGAR PRODUCTOS AL CARRITO
  ==================================================================== */
  @ViewChild('qtyNew') qtyNew!: ElementRef;
  addProductCart(product: Product, qty: any, qtyCart: number){

    qty = Number(qty);

    if (qty === 0 || qty < 0 ) {

      qty = 1 - qtyCart;
      this.carritoService.updateCarrito(product, qty);
      this.qtyNew.nativeElement.value = '1';
      return;
    }
    
    qty = qty - qtyCart;
    this.carritoService.updateCarrito(product, qty);

  }

  /** ================================================================
   *   ELIMINAR PRODUCTOS AL CARRITO
  ==================================================================== */
  deleteProductCart(i: number){
    this.carritoService.deleteProduct(i);
  }

  // FIN DE LA CLASE
}
