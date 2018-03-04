export class View{

    constructor(elemento){
        this._elemento = elemento;
    }

    update(model){
        this._elemento.innerHTML = this._template(model);
    }

    _template(model){
        throw new Error('O método não foi implementado');
    }

}