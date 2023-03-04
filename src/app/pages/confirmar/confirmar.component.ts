import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// SERVICES
import { DomiciliosService } from 'src/app/services/domicilios.service';
import { WompiService } from '../../services/wompi.service';
import Swal from 'sweetalert2';
import { Domicilio } from 'src/app/models/domicilio.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/models/carrito.model';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  
  public carrito!: Carrito;

  constructor(  private domiciliosService: DomiciliosService,
                private wompiService: WompiService,
                private carritoService: CarritoService,
                private activatedRoute: ActivatedRoute){

                  this.carrito = carritoService.carrito;

                  activatedRoute.queryParams
                    .subscribe( ({id}) => {

                      if (id) {
                        this.getPago(id);                        
                      } else {
                        
                        activatedRoute.params.subscribe( ({id, type}) => {
                          if (type === 'domicilio') {
                            this.domicilioId(id);
                          }
                        });

                      }

                    });

                  

                }

  ngOnInit(): void {
    
  }

  /**================================================================
   * OBTENER DATOS DEL PAGO DESDE WOMPI
  ================================================================ */
  public transaction: any;
  public type: string = '';
  getPago(woid: string){

    this.wompiService.getTransaccionId(woid)
        .subscribe( ({data}: any) => {

          // OBTENER EL ID DEL DOMICILIO
          this.activatedRoute.params
              .subscribe( ({id, type}) => {

                this.type = type;
                this.transaction = data;

                // COMPROBAR SI LA TRANSACCION FUE EXITOSA
                if (data.status === 'APPROVED') {

                  // LIMPIAR CARRITO DEL LOCALSTORAGE
                  for (let i = 0; i < this.carrito.products.length; i++) {              
                    this.carritoService.deleteProduct(i);              
                  }

                  this.domiciliosService.updateDomicilio(id, {pago: true, wid: woid})
                      .subscribe( ({domicilio}) => {

                        console.log(domicilio);
                        

                        this.domicilio = domicilio;

                      },(err) => {
                        console.log(err);
                        Swal.fire('Error', err.error.msg, 'error');          
                      });

                }else{
                  this.domicilioId(id);
                }

              });

        },(err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  /**================================================================
   * OBTENER DOMICILIO ID
  ================================================================ */
  public domicilio!: Domicilio;
  domicilioId(id: string){

    this.domiciliosService.getDomicilioId(id)
        .subscribe( ({domicilio}) => {

          console.log(domicilio);
          

        },(err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        });

  }

  

}
