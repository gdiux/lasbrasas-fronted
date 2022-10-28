import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, tap } from 'rxjs/operators'

// INTERFACES
import { LoadProduct, LoadCost } from '../interfaces/load-products.interface';

// MODELS
import { Product } from '../models/product.model';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(  private http: HttpClient) { }


  /** ================================================================
   *   CARGAR PRODUCTOS POR DEPARTAMENTO
  ==================================================================== */
  cargarProductoDepartamento( department: string ){
    const endPoint = `/products/department/${department}`;
    return this.http.get<LoadProduct>(`${base_url}${endPoint}`)
                    .pipe(
                      map( resp => {
                        return resp;
                      })
                    );
  }

  // FIN DE LA CLASE
}
