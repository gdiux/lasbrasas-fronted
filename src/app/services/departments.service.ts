import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, map, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { LoadDepartment } from '../interfaces/load-department.interface';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *  LOAD DEPARTMENT
  ==================================================================== */
  loadDepartment(){

    return this.http.get<LoadDepartment>(`${base_url}/departments`)
        .pipe(
          map( resp =>{
            return resp;
          })
        );
        
  }

  // FIN DE LA CLASE
}
