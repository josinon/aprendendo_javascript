describe('MaiorEMenor', function(){
    
    it('deve entener numeros em ordem não sequencial', function(){
        var algoritmo = new MaiorEMenor();
        algoritmo.encontra([5,15,7,9]);

        expect(algoritmo.pegaMaior()).toEqual(15);
        expect(algoritmo.pegaMenor()).toEqual(5);
    });

    it('deve entener numeros em ordem crescente', function(){
        var algoritmo = new MaiorEMenor();
        algoritmo.encontra([5,6,7,8]);

        expect(algoritmo.pegaMaior()).toEqual(8);
        expect(algoritmo.pegaMenor()).toEqual(5);
    });


    it('deve entener numeros em ordem decrescente', function(){
        var algoritmo = new MaiorEMenor();
        algoritmo.encontra([8,7,6,5]);

        expect(algoritmo.pegaMaior()).toEqual(8);
        expect(algoritmo.pegaMenor()).toEqual(5);
    });

    it('deve entener uma lista com um único elemento', function(){
        var algoritmo = new MaiorEMenor();
        algoritmo.encontra([5]);

        expect(algoritmo.pegaMaior()).toEqual(5);
        expect(algoritmo.pegaMenor()).toEqual(5);
    });


});