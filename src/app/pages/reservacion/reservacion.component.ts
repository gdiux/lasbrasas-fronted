import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// SERVICES
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {

  public info: boolean = false;
  public confir: boolean = false;

  constructor(  private router: Router,
                private fb: FormBuilder,
                private reservaService: ReservaService) { }

  ngOnInit(): void {

  }

  /** ================================================================
   *   CREAR RESERVA
  ==================================================================== */
  public formSubmit: boolean = false;
  public btn: boolean = false;

  public reservaForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    qty: ['', [Validators.required, Validators.min(1)]],
    comment: '',
    decoration: false,
    fecha: ['', [Validators.required ]]
  });

  crearReserva(){

    this.formSubmit = true;
    this.btn = true;
    
    if (this.reservaForm.invalid) {
      this.btn = false;
      console.log(this.reservaForm.invalid);
      
      return;
    }
    
    if (this.reservaForm.value.qty < 1) {
      this.btn = false;
      Swal.fire('Atención', 'Debes de agregar un numero valido de las personas que van a reservar', 'warning');
    }
    
    this.reservaService.createReserva(this.reservaForm.value)
        .subscribe( ({reserva}) => {

          console.log(reserva);
          

          this.btn = false;
          this.formSubmit = false;
          Swal.fire('Estupendo', 'Se ha creado la reservación exitosamente, reedireccionando a tu reserva', 'success');
          
          setTimeout(() => {
            this.router.navigateByUrl(`/reserva/${reserva.rid}`);            
          }, 1500);
          
          
        }, (err) => {
          this.btn = false;
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

    

  }


  /** ================================================================
   *   VALIDAR CAMPOS
  ==================================================================== */
  validar(campo: string): boolean{

    if ( this.reservaForm.get(campo)?.invalid && this.formSubmit ) {
       
      return true;

    }else{
      return false;
    }

  }



  // FIN DE LA CLASE
}
