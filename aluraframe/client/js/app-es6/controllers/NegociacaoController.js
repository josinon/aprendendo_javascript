import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoService} from '../services/NegociacaoService';

class NegociacaoController {

    constructor(){
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputValor = $('#valor');
        this._inputQuantidade = $('#quantidade');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(),new MensagemView($('#mensagemView')),'texto');  
        this._service = new NegociacaoService();

       this._init();

    }

    _init(){

        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });

        setInterval(()=>{
            this.importaNegociacoes();
        }, 5000);
    }

    adiciona(event){
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._service.cadastra(negociacao)
        .then(mensagem => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._clear();
        }).catch(erro => this._mensagem.texto = erro);

    }

    apaga(){
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            }).catch(erro => this._mensagem.texto = erro);
 
    }


    

    importaNegociacoes(){
        this._service.importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso';
            }).catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao(){
        return new Negociacao(
            new Date(this._inputData.value.split('-')),
            parseInt(this._inputValor.value),
            parseFloat(this._inputQuantidade.value));
        
    }
    _clear(){
        this._inputQuantidade.value = '';
        this._inputData.value = '';
        this._inputValor.value = '';
    }
}

let negociacaoController = new NegociacaoController();
export function currentInstance(){
    return negociacaoController;
}