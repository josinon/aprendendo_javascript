export class DateHelper{

    static dataParaTexto(data){
        console.log(data);
        return data.getDate()+'/'+(parseInt(data.getMonth())+1)+'/'+data.getFullYear();
    }

}