import { Product } from './product.model';

interface _products{
    product: Product,
    qty: number,
    monto: number
}

export class Carrito {

    constructor (
        public products: _products[],
        public total: number,
        public items: number
    ){


    }

}