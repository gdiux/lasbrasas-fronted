import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {MapGeocoder} from '@angular/google-maps';
import Swal from 'sweetalert2';

// MODELS
import { Carrito } from 'src/app/models/carrito.model';
import { Ubicaciones } from 'src/app/models/ubicaciones.model';

// SERVICES
import { CarritoService } from '../../services/carrito.service';
import { Product } from '../../models/product.model';
import { DomiciliosService } from 'src/app/services/domicilios.service';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  
  public carrito!: Carrito;
  public ubicaciones: Ubicaciones[] = [];
  public ubicacion!: Ubicaciones;
  constructor(  private carritoService: CarritoService,
                private domiciliosService: DomiciliosService,
                private fb: FormBuilder) { 

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

    this.createForm.setValue({
      ubicacion: this.ubicacion.localizacion,
      name: this.ubicacion.name,
      nombres: this.ubicacion.nombres,
      referencia: this.ubicacion.referencia,
      telefono: this.ubicacion.telefono,
      nota: '',
      carrito: this.carrito,
    })

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

  /** ================================================================
   *   CREAR DOMICILIO
  ==================================================================== */
  public formSubmitted: boolean = false;
  public createForm = this.fb.group({

    ubicacion: ['', [Validators.required]],
    name: ['', [Validators.required]],
    nombres: ['', [Validators.required]],
    referencia: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    nota: '',
    carrito: [[], [Validators.required]],

  });

  crearDomicilio(){

    this.formSubmitted = true;

    if (this.createForm.invalid) {
      (this.ubicaciones.length === 0)? Swal.fire('Error', 'debes de tener una ubicacion', 'error') : ''; 
      return;
    }

    // COMPROBAR SI EXISTEN PRODUCTOS EN EL CARRITO
    (this.carrito.products.length === 0)? Swal.fire('Error', 'debes de agregar productos al carrito', 'error') : '';

    // SETEAMOS EL CARRITO DE COMPRAS
    let carro:any[] = [];
    for (const items of this.carrito.products) {
      carro.push({
        product: items.product.pid,
        qty: items.qty,
        monto: items.product.price * items.qty
      })
    }
    // SETEAMOS EL CARRITO DE COMPRAS

    this.createForm.value.carrito = carro;
    this.createForm.value.ubicacion = this.center;    

    this.domiciliosService.createDomicilio(this.createForm.value)
        .subscribe( ({ domicilio }) => {

          console.log(domicilio);
          

          const url = environment.local_url;

          window.location.href = `https://checkout.wompi.co/p/?public-key=pub_prod_4uuH6FXmHJza0PCmxOq0T1a0luJlJRSU&currency=COP&amount-in-cents=${String(this.carrito.total)}00&reference=${domicilio.doid}&redirect-url=${url}/confirmar/domicilio/${domicilio.doid}`;

          // window.open(`https://checkout.wompi.co/p/?public-key=pub_prod_6mVGKjbJuRpL2SLeN9e8D41Z12sqAoGI&currency=COP&amount-in-cents=${String(this.total)}00&reference=${this.uuid.getDashFreeUUID()}&redirect-url=${this.url}/validar/${this.uuid.getDashFreeUUID()}`, "_blank");



        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        });

    


  }

  /** ================================================================
   *   VALIDAR
  ==================================================================== */
  validate(campo: string): boolean{

    if ( this.createForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    }else{
      return false;
    }

  }

  // FIN DE LA CLASE
}
