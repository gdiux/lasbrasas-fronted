import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class GpsService {

  public userLocation?: [number,number];
  
  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor() { }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject ) =>  {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {

          this.userLocation = [ coords.latitude, coords.longitude ];
          resolve(this.userLocation);

        },
        (err) => {
          console.log(err);
          Swal.fire('Error', 'Ha ocurrido un error, no se pudo obtener la geolocalización, porfavor intente de nuevo!', 'error');
          reject();
        }
      );

    });

  }


  // FIN DE LA CLASE
}
