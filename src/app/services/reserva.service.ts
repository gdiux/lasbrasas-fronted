import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, tap } from 'rxjs/operators';

// MODELS
import { Reserva } from '../models/reserva.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   CREAR RESERVACION
  ==================================================================== */
  createReserva( formaData: any ){
    return this.http.post<{ok: boolean, reserva: Reserva}>(`${base_url}/reservas/`, formaData)
  }

  /** ================================================================
   *   LOAD RESERVACION ID
  ==================================================================== */
  loadReservaId(id: string){
    return this.http.get<{ok: boolean, reserva: Reserva}>(`${base_url}/reservas/${id}`);
  }
  


  // FIN DE LA CLASE
}
