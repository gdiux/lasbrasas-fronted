import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {MapGeocoder} from '@angular/google-maps';

// MODELS
import { Ubicaciones } from 'src/app/models/ubicaciones.model';

// SERVICES
import { GpsService } from 'src/app/services/gps.service';

// INTERFACES
// interface _ubicaciones{
//   name: string,
//   nombres: string,
//   telefono: string,
//   referencia: string,
//   localizacion: {
//     lat: number,
//     lng: number
//   }
// };


@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  public restaurante = {lat: 7.060078657974728, lng: -73.16779129207134};
  public center = this.restaurante;
  
  constructor(  private geocoder: MapGeocoder,
                private gpsService: GpsService,
                private fb: FormBuilder) {}

  ngOnInit(): void {

    if (localStorage.getItem('ubicaciones')) {
      this.ubicaciones = JSON.parse(localStorage.getItem('ubicaciones')!) || [];
    }

  }

  /** =====================================================================
   *  BUSCAR DIRECCION EN EL MAPA
  =========================================================================*/
  public addrList: any[] = [];
  public zoom = 12;

  public markerOptions: google.maps.MarkerOptions = {draggable: false};
  public markerPositions: google.maps.LatLngLiteral = this.center;

  searchAddr(city: string, address: string){
    
    let termino = `${address}, ${city}, Colombia`;

    if (termino.length < 3) {
      this.addrList = [];
      return;
    }

    this.geocoder.geocode({
      address: termino
    }).subscribe(({results}) => {

      this.addrList = results;
      
    });
  }

  /** =====================================================================
   *  SELECCIONAR UBICACION
  =========================================================================*/
  selectUbicacion(viewport: any){ 
    
    this.center = {lat: Number(viewport.getCenter().lat()), lng: Number(viewport.getCenter().lng())};

    this.markerPositions = this.center;

  }
  
  /** =====================================================================
   *  CAMBIAR UBICACION MANUAL
  =========================================================================*/
  addMarker(event: google.maps.MapMouseEvent) {    

    this.markerPositions = event.latLng!.toJSON();
    this.center = this.markerPositions;
  }

  /** =====================================================================
   *  OBTENER UBICACION DESDE EL GPS DEL TELEFONO
  =========================================================================*/
  openGps(){

    if (!navigator.geolocation) {
      Swal.fire('Error', 'Este navegador no permite usar el GPS, recomendamos cambiar a Google Chrome o Firefox', 'error');
      return;
    }

    this.gpsService.getUserLocation()
        .then( resp => {

          this.center = {lat: resp[0], lng: resp[1]};
          this.markerPositions = this.center;

        });       

  }

  /** =====================================================================
   *  GUARDAR UBICACION
  =========================================================================*/
  public ubicaciones: Ubicaciones[] = [];
  public ubiFormSubmitted: boolean = false;
  public ubiForm = this.fb.group({

    name: ['', [Validators.required, Validators.minLength(3)]],
    nombres: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['', [Validators.required, Validators.minLength(3)]],
    referencia: ['', [Validators.required, Validators.minLength(3)]],
    localizacion: '',
    term: [false, [Validators.requiredTrue]],

  });

  guardarUbicacion(){

    this.ubiFormSubmitted = true;

    if (this.ubiForm.invalid) {
      return;
    }

    if( this.center === this.restaurante ){
      Swal.fire('Atención', 'No puedes seleccionar la misma ubicación del restaurante', 'warning');
      return;
    }

    this.ubiForm.value.localizacion = this.center;
    this.ubicaciones.push(this.ubiForm.value);

    // GUARDAR EN EL LOCAL STORAGE
    localStorage.setItem('ubicaciones', JSON.stringify(this.ubicaciones));

    Swal.fire('Estupendo', 'Hemos guardado exitosamente tu ubicación, ve a menu para hacer tu pedido', 'success');
    this.ubiForm.reset();  
    this.ubiFormSubmitted = false;

  }

  /** =====================================================================
   *  VALIDAR FORMULARIO
  =========================================================================*/
  validate(campo:string): boolean{

    if ( this.ubiForm.get(campo)?.invalid && this.ubiFormSubmitted) {
      return true;
    }else{
      return false;
    }

  }

  /** =====================================================================
   *  BORRAR UBICACION
  =========================================================================*/
  borrarUbicacion( i: any ){

    this.ubicaciones.splice(i, 1);

    if (this.ubicaciones.length === 0) {
      localStorage.removeItem('ubicaciones');
      Swal.fire('Estupendo', 'Se ha eliminado la ubicación exitosamente', 'success');
      return;
    }

    // GUARDAR EN EL LOCAL STORAGE
    localStorage.setItem('ubicaciones', JSON.stringify(this.ubicaciones));
    Swal.fire('Estupendo', 'Se ha eliminado la ubicación exitosamente', 'success');
    

  }

  // FIN DE LA CLASE  
}
