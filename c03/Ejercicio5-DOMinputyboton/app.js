let inputCantidad = document.getElementById("cantidad");
let boton = document.getElementById("btnGenerar");
let parrafo = document.getElementById("resultado");
let mensajeError = document.getElementById("mensajeError");

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
   

boton.addEventListener("click", function ()
{
    let n = Number(inputCantidad.value);

    if (inputCantidad.value === "" || n < 1)
    {
        mensajeError.textContent = "Error: ingresá un número mayor o igual a 1.";
        resultadoHTML.textContent = "";
    }
    else
    {
        mensajeError.textContent = "";

        let resultado = generarAsteriscos(n);
        resultadoHTML.textContent = resultado;
    }
});