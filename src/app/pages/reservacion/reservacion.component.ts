import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {

  public info: boolean = false;
  public confir: boolean = false;

  constructor(  private router: Router,
                private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  /** ================================================================
   *   CREAR RESERVA
  ==================================================================== */
  public formSubmit: boolean = false;
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

    if (this.reservaForm.invalid) {
      return;
    }

    if (this.reservaForm.value.qty < 1) {
      Swal.fire('Atención', 'Debes de agregar un numero valido de las personas que van a reservar', 'warning');
    }
    console.log(this.reservaForm.value);

    

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
