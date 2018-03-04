
import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }


    obterNegociacoes(){
        
        return new Promise((resolve, reject) => {
            Promise.all([this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()])
                .then(negociacoes => {
                    resolve(negociacoes.reduce((arrayGeral, array) => arrayGeral.concat(array), []))
                    
                }).catch(erro => reject(erro));
        });

        
        return resultado;
    }

    obterNegociacoesDaSemana(){
        return this._obterNegociacoes('negociacoes/semana');
    }

    obterNegociacoesDaSemanaRetrasada(cb){
        return this._obterNegociacoes('negociacoes/retrasada');
    }

    obterNegociacoesDaSemanaAnterior(cb){
        return this._obterNegociacoes('negociacoes/anterior');
    }

    _obterNegociacoes(url){

        return new Promise((resolve, reject) => {
            this._http.get(url)
            .then(negociacoes =>{
                resolve(negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));
            }).catch(erro => {
                console.log(erro);
                reject('Não foi possível obter informacoes do servidor');
            });
        });
    }

    cadastra(negociacao){
        return new Promise((resolve, reject) =>  {
            ConnectionFactory.getConnection().then(connection => {
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(()=>{
                        resolve('Negociação adicionada com sucesso!!');
                    }).catch(erro => this._mensagem.texto = erro);
            });      
        }) 
    }

    lista(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
        });

    }

    apaga(){
        return ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        .then(dao => dao.apagaTodos())
        .then(() => 'Negociações apagadas com sucesso')
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possível apagar as negociacoes');
        })

    }

    importa(listaAtual){
        return this.obterNegociacoes()
        .then(negociacoes => negociacoes.filter(negociacao => 
            !listaAtual.some(negociacaoExistente =>
                JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))
        )).catch(erro => {
            console.log(erro);
            throw Error('Não foi possivel importar as negociacoes');
        });
    }
}