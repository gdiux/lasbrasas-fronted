import { Injectable } from '@angular/core';

// MODELS
import { Carrito } from '../models/carrito.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito!: Carrito;

  constructor() {

    this.carrito = this.CarritoLocalStorage;

  }

  /** ================================================================
   *   CARGAR CARRITO DEL LOCALSTORAGES
  ==================================================================== */
  get CarritoLocalStorage(): any {

    if (!localStorage.getItem('carrito')) {
      return { products: [], total: 0, items: 0 }
    }else{

      return JSON.parse( localStorage.getItem('carrito')! );
    }

  }

  /** ================================================================
   *  ACTUALIZAR CARRITO
  ==================================================================== */
  updateCarrito(product: Product, qty: number){
    
    // COMPROBAMOS SI EXISTE EL 
    const validarItem = this.carrito.products.findIndex( (producto) => {
      return (product.pid === producto.product.pid) ? true : false
    });
    
    if (validarItem === -1) {

      // AGREGAMOS EL PRODUCTO AL CARRITO
      this.carrito.products.push({
        product,
        qty,
        monto: (product.price * qty)
      });

      // SUMAMOS EL TOTAL
      this.carrito.total += (product.price * qty);
      this.carrito.items += qty;
      
    } else {

      this.carrito.total = 0;
      this.carrito.items = 0;

      this.carrito.products.map( producto => {

        if (producto.product.pid === product.pid) {
          producto.qty += qty;
          producto.monto = ( product.price * producto.qty );
        }

        // SUMAMOS LOS MONTOS
        this.carrito.total += producto.monto;
        this.carrito.items += producto.qty;

      });
      
    }

    // GUARDAMOS EN EL LOCALSTORAGE
    localStorage.setItem('carrito', JSON.stringify(this.carrito));    

  }

  /** ================================================================
   *  BORRAR PRODUCTO DEL CARRITO
  ==================================================================== */
  deleteProduct(i:number){

    this.carrito.items = 0;
    this.carrito.total = 0;

    this.carrito.products.splice(i, 1);

    // COMPROBAMOS DE QUE EL CARRITO QUEDE VACIO
    if (this.carrito.products.length === 0) {      
      localStorage.removeItem('carrito');
      return;
    }

    // SI NO, SUMAMOS LOS ITEMS Y CALCULAMOS EL TOTAL NUEVO
    for (const producto of this.carrito.products) {
      this.carrito.items += producto.qty;
      this.carrito.total += producto.monto
    }

    // GUARDAMOS EN EL LOCALSTORAGE
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

  }

  // FIN DE LA CLASE
}


