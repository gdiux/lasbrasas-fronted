import { Pipe, PipeTransform } from '@angular/core';

import { environment } from "../../environments/environment"

const server_url = environment.server_url;
const local_url = environment.local_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'products' | 'logo' | 'user' | 'department' | 'menu'): string {
    if (img) {

      if (img.includes('https')) {                    
        return `${img}`;
      }else{

        if (tipo === 'menu') {
          return `background-image: url(${local_url}/assets/img/menu/${img});`;
        }else{
          return `${server_url}/uploads/${tipo}/${img}`;          
        }

      }
    
    }else{
        return `${server_url}/uploads/${tipo}/no-image`;
    }
  }

}
