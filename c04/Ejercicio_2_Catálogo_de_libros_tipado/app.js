"use strict";
let inputAutor = document.getElementById("filtroAutor");
let filtrar = document.getElementById("filtrar");
let disponibles = document.getElementById("mostrarDisponibles");
let todos = document.getElementById("mostrarTodos");
let mensajeError = document.getElementById("mensajeError");
let stats = document.getElementById("stats");
let listado = document.getElementById("listado");
const catalogo = [{
        isbn: "123",
        autor: "Oscar Wilde",
        titulo: "El fantasma de Canterville",
        precio: 10000,
        disponible: true,
        genero: "Ficcion"
    },
    {
        isbn: "124",
        autor: "J.K. Rowling",
        titulo: "Harry Potter y la piedra filosofal",
        precio: 45000,
        disponible: true,
        genero: "Fantasia"
    },
    {
        isbn: "125",
        autor: "James Clear",
        titulo: "Hábitos Atómicos",
        precio: 25000,
        disponible: true,
        genero: "Autoayuda"
    },
    {
        isbn: "126",
        autor: "Edgar Allan Poe",
        titulo: "El gato negro",
        precio: 15000,
        disponible: true,
        genero: "Terror"
    }
];
function buscarPorAutor(autor) {
    let resultado = [];
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].autor.toLowerCase().includes(autor.toLowerCase())) {
            resultado.push(catalogo[i]);
        }
    }
    return resultado;
}
filtrar.addEventListener("click", () => {
    let autor = inputAutor.value;
    renderizar(buscarPorAutor(autor));
});
function librosDisponibles() {
    let resultado = [];
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].disponible) {
            resultado.push(catalogo[i]);
        }
    }
    return resultado;
}
disponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
function precioPromedio(libros) {
    let resultado = 0;
    for (let i = 0; i < libros.length; i++) {
        resultado += libros[i].precio;
    }
    return resultado / libros.length;
}
function renderizar(libros) {
    listado.innerHTML = "";
    for (let i = 0; i < libros.length; i++) {
        let li = document.createElement("li");
        li.textContent = libros[i].titulo + "  |  " + libros[i].autor + "  |  $" + libros[i].precio;
        listado.appendChild(li);
    }
    let promedio = precioPromedio(libros);
    stats.textContent = "Cantidad: " + libros.length + " | Promedio: $" + promedio;
}
todos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
