let nombre = document.getElementById("cargaNombre") as HTMLInputElement;
let email = document.getElementById("cargaEmail") as HTMLInputElement;
let telefono = document.getElementById("cargaTelefono") as HTMLInputElement;
let carga = document.getElementById ("cargarTodo") as HTMLButtonElement;
let mensaje = document.getElementById("mensajeError") as HTMLParagraphElement;
let listar = document.getElementById ("listarUsuarios") as HTMLButtonElement;
let cargando = document.getElementById("cargando") as HTMLParagraphElement;

interface Usuario
{
    idUsuario : string;
    email: string;
    name: string;
    phone: number;

}

const usuarios : Usuario [] =

[{

    idUsuario : "34036",
    email: "antudon@gmail.com",
    name: "Antu",
    phone: 2944657075,

},
{

    idUsuario : "34250",
    email: "martinezdevetter@gmail.com",
    name: "Joaquin",
    phone: 2216052250,

}]






function validarDatos():Usuario | null {

let nombreValor = nombre.value;
let emailValor = email.value;
let telefonoValor: number = Number(telefono.value);


if ( nombreValor == "" || emailValor == "" || isNaN  (telefonoValor) || telefonoValor < 0){

    return null;

}

let nuevoUsuario : Usuario = {

    idUsuario: Date.now().toString(),
    name: nombreValor,
    email: emailValor,
    phone: telefonoValor,
   
};

return nuevoUsuario;
}

carga.addEventListener("click", () => {

let usuario: Usuario | null = validarDatos()


if (usuario == null ){

    mensaje.textContent= "Completar los campos correspondientes";

}
else
{
    usuarios.push(usuario);

    mensaje.textContent= "";

    renderizarUsuarios(usuarios);

    nombre.value = "";
    email.value = "";
    telefono.value = "";
   
}

});

mostrarUsuarios();

async function obtenerUsuarios(): Promise<Usuario[]> {

    let respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    let datos = await respuesta.json();

    return datos as Usuario[];

}

async function mostrarUsuarios() {


    try{

            let usuarios = await obtenerUsuarios();

            for (let i = 0; i < usuarios.length; i++){


                console.log("Nombre", usuarios[i].name);
                console.log("Email:", usuarios[i].email);

            }



    }catch(error){


            console.log(error);


    }

    
    
}
function renderizarUsuarios(usuarios: Usuario[]) {

    let lista = document.getElementById("listaUsuarios") as HTMLUListElement;

    lista.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {

        let li = document.createElement("li");

        li.textContent = usuarios[i].name + " - " + usuarios[i].email;

        lista.appendChild(li);

    }

}

async function cargarUsuariosEnPantalla() {

    try {

        cargando.style.display = "block";
        mensaje.textContent = "";


        renderizarUsuarios(usuarios);

        let usuariosApi = await obtenerUsuarios();

        let todos = usuarios.concat(usuariosApi);

        renderizarUsuarios(todos);

    } catch (error) {

        mensaje.textContent = "Error al cargar usuarios";
        mensaje.style.color = "red";
        console.log(error);

    } finally {

        cargando.style.display = "none";

    }

}


listar.addEventListener("click", () => {

    cargarUsuariosEnPantalla();

});