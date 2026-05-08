let tituloLibro = document.getElementById("buscarTitulo");
let buscar = document.getElementById("buscarLibro");
let mensajeError = document.getElementById("mensajeError");
let resultados = document.getElementById("resultados");

async function buscarLibro()
{
    let texto = tituloLibro.value.toLowerCase();

    let respuesta = await fetch("https://openlibrary.org/search.json?q=" + texto);

    let datos = await respuesta.json();

    return datos.docs;
}

function renderizarLibros(libros)
{
    resultados.innerHTML = "";

    for(let i = 0; i < 10 && i < libros.length; i++)
    {
        let tarjeta = document.createElement("div");

        tarjeta.className = "col-md-4";

        tarjeta.innerHTML =

        '<div class="card h-100">' +

            '<div class="card-body">' +

                '<h5 class="card-title">' +
                    libros[i].title +
                '</h5>' +

                '<p class="card-text">' +
                    (libros[i].author_name?.[0] || "Sin autor") +
                '</p>' +

                '<p class="card-text">' +
                    (libros[i].first_publish_year || "Sin año") +
                '</p>' +

            '</div>' +

        '</div>';

        resultados.appendChild(tarjeta);
    }
}

buscar.addEventListener("click", async () =>
{
    if (tituloLibro.value == "")
    {
        mensajeError.textContent = "Ingrese un titulo para buscar";
        return;
    }

    mensajeError.textContent = "";

    try
    {
        let libros = await buscarLibro();

        renderizarLibros(libros);
    }
    catch (error)
    {
        mensajeError.textContent = "Error al buscar libros";
        console.log(error);
    }
});