export class Reserva {

    constructor(
        public reserva: number,
        public name: string,
        public phone: string,
        public email: string,
        public qty: number,
        public comment: string,
        public decoration: boolean,
        public confirm: boolean,
        public status: boolean,
        public fecha: Date,
        public rid: string
    ){}

}