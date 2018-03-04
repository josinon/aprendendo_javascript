describe('Consulta', function(){

    var guilherme;

    beforeEach(function(){
        console.log('beforeEach');
        guilherme = new PacienteBuilder().constroi(); 
    });

    describe('Consultas do tipo retorno', function(){
        it('não deve cobrar nada se for um retorno', function(){
            var consulta = new Consulta(guilherme, [], true, true);
            expect(consulta.preco()).toEqual(0);
        });

    });

    describe('Consultas com procedimentos', function(){
        it('deve cobrar 25 por cada procedimento comum', function(){
            var consulta = new Consulta(guilherme, ['proc1','proc2','proc3'], false, false);
            expect(consulta.preco()).toEqual(75);
        });

        it('deve cobrar 25 por cada procedimento comum', function(){
            var consulta = new Consulta(guilherme, ['procedimento-comum','raio-x','procedimento-comun', 'gesso'], false, false);
            expect(consulta.preco()).toEqual(25+55+25+32);
        });
    });

    

});