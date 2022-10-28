import { Pipe, PipeTransform } from '@angular/core';

import { environment } from "../../environments/environment"

const server_url = environment.server_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'products' | 'logo' | 'user' | 'department'): string {
    if (img) {

      if (img.includes('https')) {                    
        return `${img}`;
      }else{
        return `${server_url}/uploads/${tipo}/${img}`;          
      }
    
    }else{
        return `${server_url}/uploads/${tipo}/no-image`;
    }
  }

}
