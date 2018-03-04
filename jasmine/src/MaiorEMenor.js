function MaiorEMenor(){
    var menor;
    var maior;
    var clazz = {
        encontra: function (nums){
            menor = Number.MAX_VALUE;
            maior = Number.MIN_VALUE;
            nums.forEach(function (num){
                if (num < menor) menor = num;
                if (num > maior) maior = num;
            });
        },
        pegaMenor: function() {return menor;},
        pegaMaior: function() {return maior;}
    };
    return clazz;
}


var algoritmo = new MaiorEMenor();
algoritmo.encontra([5,15,7,9]);
console.log(algoritmo.pegaMaior());
console.log(algoritmo.pegaMenor());