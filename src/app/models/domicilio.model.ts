import { Ubicaciones } from './ubicaciones.model';
import { Carrito } from './carrito.model';

export class Domicilio{

    constructor(
        public ubicacion: Ubicaciones,
        public carrito: Carrito,
        public comentario: string,
        public pago: boolean,
        public status: boolean,
        public confirmado: boolean,
        public estado: string,
    ){}

}