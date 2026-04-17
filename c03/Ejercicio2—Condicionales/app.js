let resultado;
let dia;
function verAprobado(){

let nota = Number(prompt("Ingrese nota:"));

if (nota < 4)
{

    resultado = "Desaprobado";
}
else if( nota >= 4 && nota <= 7 )
{

    resultado = "Aprobado";

}
else
{

    resultado = "Promocionado";

}
    return resultado;
}


console.log(verAprobado());

function diaDeLaSemana()
{

    let dia = Number(prompt("Ingrese un número para retornar el día correspondiente:"));

    switch(dia)
    {

        case 1: 

            console.log("1: Lunes");

            break;

        case 2:

            console.log("2: Martes");

            break;

        case 2:

            console.log("2: Martes");

            break;

        case 3:

            console.log("3: Miercoles");

            break;

        case 4:

            console.log("4: Jueves");

            break;

        case 5:

            console.log("5: Viernes");

            break;

        case 6:

            console.log("6: Sábado");

            break;

        case 7:

            console.log("7: Domigo");

            break;

        default:

            console.log("Día inválido");

            
    }

}

console.log(diaDeLaSemana())