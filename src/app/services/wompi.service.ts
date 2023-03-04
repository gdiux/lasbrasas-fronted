import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WompiService {

  constructor(  private http: HttpClient) { }

  /**================================================================
   * OBTENER TRANSACCION
  ================================================================ */
  getTransaccionId(id:string){

    return this.http.get(`https://sandbox.wompi.co/v1/transactions/${id}`)

  }

}
