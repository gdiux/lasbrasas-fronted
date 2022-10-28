import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// MODEL
import { Product } from '../../models/product.model';

// SERVICES
import { ProductosService } from '../../services/productos.service';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../models/department.model copy';

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
                private departmentsService: DepartmentsService) { }

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
   *  GET DEPARTMENTS
  =========================================================================*/
  public departamentos: Department[] = [];
  cargarDepartamentos(){

    this.departmentsService.loadDepartment()
        .subscribe( ({departments}) => {

          console.log(departments);
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

          console.log(products);
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

  // FIN DE LA CLASE
}
