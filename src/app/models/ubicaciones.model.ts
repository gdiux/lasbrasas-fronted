interface _localizacion {
    lat: number,
    lng: number
}

export class Ubicaciones{

    constructor(
        public name: string,
        public nombres: string,
        public telefono: string,
        public referencia: string,
        public localizacion: _localizacion
    ){}

}