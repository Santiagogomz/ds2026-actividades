let inputCantidad = document.getElementById("cantidad");
let boton = document.getElementById("btnGenerar");
let parrafo = document.getElementById("resultado");


function generarAsteriscos(n)
{
    let resultado = "";

    for (let i = 1; i <= n; i++)
{
    for (let j = 0; j < i; j++)
    {
        resultado += "*";
    }

    resultado += "\n";
}
    return resultado;
    }
   

boton.addEventListener("click", function()
{

    let n = Number(inputCantidad.value);

    let resultado = generarAsteriscos (n);

    parrafo.innerText = resultado;

});