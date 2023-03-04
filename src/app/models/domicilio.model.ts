import { Ubicaciones, _localizacion } from './ubicaciones.model';
import { Carrito } from './carrito.model';

export class Domicilio{

    constructor(
        public ubicacion: _localizacion,
        public name: string,
        public nombres: string,
        public referencia: string,
        public telefono: string,
        public nota: string,
        public wid: string,
        public estado: string,
        public carrito: any,
        public pago: boolean,
        public status: boolean,
        public fecha: Date,
        public doid: string,
    ){}

}