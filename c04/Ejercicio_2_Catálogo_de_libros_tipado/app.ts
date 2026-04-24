let inputAutor = document.getElementById("filtroAutor") as HTMLInputElement;
let filtrar = document.getElementById("filtrar") as HTMLButtonElement;
let disponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
let todos = document.getElementById("mostrarTodos") as HTMLButtonElement;
let mensajeError = document.getElementById("mensajeError") as HTMLParagraphElement;
let stats = document.getElementById("stats") as HTMLParagraphElement;
let listado = document.getElementById("listado") as HTMLUListElement;


interface Libro {

    isbn: string;
    autor: string;
    titulo: string; 
    precio: number;
    disponible: boolean;
    genero?: string;
     
}

const catalogo: Libro [] = 
[{
    isbn: "123",
    autor: "Oscar Wilde",
    titulo:"El fantasma de Canterville", 
    precio:10000,
    disponible:true, 
    genero:"Ficcion"
},
{

    isbn: "124",
    autor: "J.K. Rowling",
    titulo:"Harry Potter y la piedra filosofal", 
    precio:45000,
    disponible:true, 
    genero:"Fantasia"

},
{
    
    isbn: "125",
    autor: "James Clear",
    titulo:"Hábitos Atómicos", 
    precio:25000,
    disponible:true, 
    genero:"Autoayuda"
},
{
    
    isbn: "126",
    autor: "Edgar Allan Poe",
    titulo:"El gato negro", 
    precio:15000,
    disponible:true, 
    genero:"Terror"
}

]
function buscarPorAutor(autor: string): Libro[] {

    let resultado: Libro[] = [];

    for (let i = 0; i < catalogo.length; i++)
    {
        if (catalogo[i].autor.toLowerCase().includes(autor.toLowerCase()))
        {
            resultado.push(catalogo[i]);
        }
    }

    return resultado;
}

filtrar.addEventListener("click", () =>{

    let autor: string = inputAutor.value;
    renderizar(buscarPorAutor(autor));

});


function librosDisponibles(): Libro[]{

    let resultado: Libro[] = [];

    for (let i = 0; i < catalogo.length; i++)
    {

        if (catalogo[i].disponible)
        {
            resultado.push(catalogo[i]);
        }

    }

    return resultado;

}

disponibles.addEventListener("click", () => {

    renderizar(librosDisponibles());



});

function precioPromedio(libros: Libro[]): number{

    let resultado: number = 0;

    for (let i = 0; i < libros.length; i++)
    {

        resultado += libros[i].precio;

        }

       return resultado / libros.length;
    }

function renderizar(libros: Libro[]):void{

    listado.innerHTML="";

    for(let i= 0; i < libros.length; i++)
    {

        let li = document.createElement("li");

        li.textContent= libros[i].titulo + "  |  " + libros[i].autor + "  |  $" + libros[i].precio;

        listado.appendChild(li);


    }

    let promedio: number = precioPromedio(libros);
    stats.textContent= "Cantidad: " + libros.length + " | Promedio: $" + promedio;

}


todos.addEventListener("click", () => {

    renderizar(catalogo);

});
    

 renderizar(catalogo);