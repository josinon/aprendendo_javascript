const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = JSON.parse(localStorage.getItem('cartoes')) || [];

    cartoes = cartoes.map(
        cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo))
    cartoes.forEach(cartao => {
        preparaCartao(cartao);
    }); 
    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render();
    Filtro.on("filtrado", render)


    function preparaCartao(cartao){
        let urlsImagens = Cartao.pegaImagens(cartao);
        urlsImagens.forEach(url => {
            fetch(url).then(resposta => {
                caches.open('ceep-imagens').then(cache =>{
                    cache.put(url, resposta);
                });
            });
        })


        cartao.on("mudanca.**", salvaCartoes);
        cartao.on("remocao", ()=>{
            cartoes = cartoes.slice(0);
            cartoes.splice(cartoes.indexOf(cartao),1);
            salvaCartoes();
            render();
        });
    }
    function salvaCartoes(){
        localStorage.setItem("cartoes", JSON.stringify(
            cartoes.map(cartao => ({conteudo: cartao.conteudo, tipo: cartao.tipo}))));
    }

    function adiciona(cartao){
        console.log('logado = '+logado);
        if(logado){
            cartoes.push(cartao);
            salvaCartoes();
            preparaCartao(cartao);
            render();
            return true;
        }else{
            alert('Você não está logado');
        }
        
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
