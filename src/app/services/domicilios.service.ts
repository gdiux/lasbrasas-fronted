import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { Domicilio } from '../models/domicilio.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DomiciliosService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET DOMICILIO ID
  ==================================================================== */
  getDomicilioId(id: string){
    return this.http.get<{ok: boolean, domicilio: Domicilio}>(`${base_url}/domicilios/${id}`);
  }


  /** ================================================================
   *   CREAR DOMICILIO
  ==================================================================== */
  createDomicilio( formaData: any ){
    return this.http.post<{ok: boolean, domicilio: Domicilio}>(`${base_url}/domicilios/`, formaData)
  }

  /** ================================================================
   *   UPDATE DOMICILIO ID
  ==================================================================== */
  updateDomicilio(id: string, formData: any){
    return this.http.put<{ok: boolean, domicilio: Domicilio}>(`${base_url}/domicilios/${id}`, formData);
  }

}
