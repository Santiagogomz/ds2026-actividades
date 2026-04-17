let inputProducto = document.getElementById("producto");
let btnAgregar = document.getElementById("btnAgregar");
let mensajeError = document.getElementById("mensajeError");
let listaProductos = document.getElementById("listaProductos");
let textoContador = document.getElementById("contador");
let contador = 0;

btnAgregar.addEventListener("click", function ()
{
    let nombre = inputProducto.value;

    if (nombre === "")
    {
        mensajeError.textContent = "Error: ingrese el nombre del producto.";
    }
    else
    {
        mensajeError.textContent = "";

        let item = document.createElement("li");
        item.textContent = nombre + " ";

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function ()
        {
            listaProductos.removeChild(item);
            contador -= 1;
            textoContador.textContent = `${contador} productos en la lista`;
        });

        item.appendChild(botonEliminar);
        listaProductos.appendChild(item);

        contador += 1;
        textoContador.textContent = `${contador} productos en la lista`;

        inputProducto.value = "";
    }
});