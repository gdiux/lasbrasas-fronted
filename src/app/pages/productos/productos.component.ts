import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// MODEL
import { Product } from '../../models/product.model';

// SERVICES
import { ProductosService } from '../../services/productos.service';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../models/department.model copy';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public page!: string;

  constructor(  private activatedRoute: ActivatedRoute,
                private productosService: ProductosService,
                private router: Router,
                private departmentsService: DepartmentsService,
                private carritoService: CarritoService) { }

  ngOnInit(): void {

    // CARGAR DEPARTAMENTOS
    this.cargarDepartamentos();

    this.activatedRoute.params.subscribe( ({id, productos}) => {

      this.cargarProductos(id);
      this.page = productos;
      document.title = `${productos} - Las Brasas Parrilla & Sazón`;
      
    });

  }

  /** =====================================================================
   *  GET PRODUCTOS
  =========================================================================*/
  public departamentos: Department[] = [];
  cargarDepartamentos(){

    this.departmentsService.loadDepartment()
        .subscribe( ({departments}) => {

          this.departamentos = departments;
          
        }, (err) => {
          console.log(err.error.msg);          
        });

  }

  /** ================================================================
   *   CARGAR PRODUCTOS POR DEPARTAMENTO
  ==================================================================== */
  public productos: Product[] = [];
  
  cargarProductos(department: string){

    this.productosService.cargarProductoDepartamento(department)
        .subscribe( ({products}) => {

          this.productos = products;

        }, (err) => {
          console.log(err.error.msg);
          this.router.navigateByUrl('/menu');
          
        });

  }

  /** ================================================================
   *   SELECCIONAR PRODUCTO
  ==================================================================== */
  public productoSelect!: Product;

  select(producto: Product){

    this.productoSelect = producto;

  }

  /** ================================================================
   *   AGREGAR PRODUCTOS AL CARRITO
  ==================================================================== */
  addProductCart(product: Product, qty: any){

    if (qty === 0 ) {
      return;
    }

    qty = Number(qty);

    this.carritoService.updateCarrito(product, qty);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se agrego el producto exitosamente!',
      showConfirmButton: false,
      timer: 1500
    })

  }


  // FIN DE LA CLASE
}
