import { Component, OnInit } from '@angular/core';

// SERVICES
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(  private departmentsService: DepartmentsService) { }

  ngOnInit(): void {

    // CARGAR DEPARTAMENTOS
    this.cargarDepartamentos();

  }

  /** =====================================================================
   *  GET DEPARTMENTS
  =========================================================================*/
  public departamentos: Department[] = [];
  cargarDepartamentos(){

    this.departmentsService.loadDepartment()
        .subscribe( ({departments}) => {

          console.log(departments);
          this.departamentos = departments;
          

        }, (err) => {
          console.log(err.error.msg);          
        });

  }

  // FIN DE LA CLASE
}
