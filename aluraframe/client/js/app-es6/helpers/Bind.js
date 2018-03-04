import {ProxyFactory} from '../services/ProxyFactory';
export class Bind{
    constructor(model, view, ...props){
        this.proxy = ProxyFactory.create(model, props, model => 
            view.update(model));

        view.update(model);

        return this.proxy;
    }
}