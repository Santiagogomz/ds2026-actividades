"use strict";
let nombre = document.getElementById("cargaNombre");
let email = document.getElementById("cargaEmail");
let telefono = document.getElementById("cargaTelefono");
let carga = document.getElementById("cargarTodo");
let mensaje = document.getElementById("mensajeError");
let listar = document.getElementById("listarUsuarios");
let cargando = document.getElementById("cargando");
const usuarios = [{
        idUsuario: "34036",
        email: "antudon@gmail.com",
        name: "Antu",
        phone: 2944657075,
    },
    {
        idUsuario: "34250",
        email: "martinezdevetter@gmail.com",
        name: "Joaquin",
        phone: 2216052250,
    }];
function validarDatos() {
    let nombreValor = nombre.value;
    let emailValor = email.value;
    let telefonoValor = Number(telefono.value);
    if (nombreValor == "" || emailValor == "" || isNaN(telefonoValor) || telefonoValor < 0) {
        return null;
    }
    let nuevoUsuario = {
        idUsuario: Date.now().toString(),
        name: nombreValor,
        email: emailValor,
        phone: telefonoValor,
    };
    return nuevoUsuario;
}
carga.addEventListener("click", () => {
    let usuario = validarDatos();
    if (usuario == null) {
        mensaje.textContent = "Completar los campos correspondientes";
    }
    else {
        usuarios.push(usuario);
        mensaje.textContent = "";
        renderizarUsuarios(usuarios);
        nombre.value = "";
        email.value = "";
        telefono.value = "";
    }
});
mostrarUsuarios();
async function obtenerUsuarios() {
    let respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    let datos = await respuesta.json();
    return datos;
}
async function mostrarUsuarios() {
    try {
        let usuarios = await obtenerUsuarios();
        for (let i = 0; i < usuarios.length; i++) {
            console.log("Nombre", usuarios[i].name);
            console.log("Email:", usuarios[i].email);
        }
    }
    catch (error) {
        console.log(error);
    }
}
function renderizarUsuarios(usuarios) {
    let lista = document.getElementById("listaUsuarios");
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
    }
    catch (error) {
        mensaje.textContent = "Error al cargar usuarios";
        mensaje.style.color = "red";
        console.log(error);
    }
    finally {
        cargando.style.display = "none";
    }
}
listar.addEventListener("click", () => {
    cargarUsuariosEnPantalla();
});
