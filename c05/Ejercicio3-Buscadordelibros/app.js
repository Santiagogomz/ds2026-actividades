"use strict";
let tituloLibro = document.getElementById("buscarTitulo");
let buscar = document.getElementById("buscarLibro");
let mensajeError = document.getElementById("mensajeError");
let resultados = document.getElementById("resultados");
const catalogo = [{
        title: "Fundamentos de Programacion 01",
        first_publish_year: 2000,
    }];
async function buscarLibro() {
    let texto = tituloLibro.value.toLowerCase();
    let respuesta = await fetch("https://openlibrary.org/search.json?q=" + texto);
    let datos = await respuesta.json();
    return datos.docs;
}
function renderizarLibros(libros) {
    resultados.innerHTML = "";
    for (let i = 0; i < 10 && i < libros.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.innerHTML =
            "<h3>" + libros[i].title + "<h3>" +
                "<p>Autor: " + (libros[i].author_name?.[0] || "Sin autor") + "</p>" +
                "<p>Año:" + (libros[i].first_publish_year ? libros[i].first_publish_year : "Sin año") + "</p>";
        resultados.appendChild(tarjeta);
    }
}
buscar.addEventListener("click", async () => {
    if (tituloLibro.value == "") {
        mensajeError.textContent = "Ingrese un titulo para buscar";
        return;
    }
    mensajeError.textContent = "";
    try {
        let libros = await buscarLibro();
        renderizarLibros(libros);
    }
    catch (error) {
        mensajeError.textContent = "Error al buscar libros";
        console.log(error);
    }
});
async function mostrarLibro() {
    try {
        let libros = await buscarLibro();
        for (let i = 0; i < catalogo.length; i++) {
            console.log("Titulo:", catalogo[i].title);
            console.log("Autor:", catalogo[i].author_name);
            console.log("Fecha publicación:", catalogo[i].first_publish_year);
        }
    }
    catch (error) {
        console.log(error);
    }
}
