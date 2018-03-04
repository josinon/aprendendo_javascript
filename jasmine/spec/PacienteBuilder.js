function PacienteBuilder(){
    var nome = 'Guilherme';
    var idade = 28;
    var peso = 72;
    var altura = 1.80;

    var clazz = {
        constroi: function(){
            return Paciente(nome, idade, peso, altura);
        },
        comIdade: function(valor){
            idade = valor;
            return this;
        },
        comPeso: function(valor){
            peso = valor;
            return this;
        },
    }
    return clazz;

}