export class ListaNegociacoes{

    constructor(){
        this._negociacoes = []
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    remove(negociacao){
        this._negociacoes.remove(negociacao);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = []
    }

}