const numeros = [6,3,8,11,1,7,0,33];
let suma=0;
let promedio;
let mayor = numeros[0];
let menor = numeros [0];
const tamaniovector = numeros.length;
for (let i = 0; i < numeros.length; i++)
{
  

  suma = suma + numeros[i];
  
    if(numeros[i] > mayor)
    {
        mayor = numeros[i];

    }
    else if(numeros[i] < menor)
    {
        menor= numeros[i];
    }

}

promedio= suma / tamaniovector;

console.log(`Sumatoria total : ${suma}`);
console.log(`Número Mayor : ${mayor}`);
console.log(`Número Menor : ${menor}`);


let n = Number(prompt("Ingrese la cantidad de asteriscos que desea generar:"));
function generarAsteriscos(n)
{
    let resultado = "";
    for (let i = 0; i < n; i++)
    {   
        resultado = resultado + "*";
    }

    return resultado;


}

let resultado = generarAsteriscos(n);
console.log(resultado);