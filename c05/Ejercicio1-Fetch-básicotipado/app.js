"use strict";
let nombre = document.getElementById("cargaNombre");
let email = document.getElementById("cargaEmail");
let telefono = document.getElementById("cargaTelefono");
let carga = document.getElementById("cargarTodo");
let mensaje = document.getElementById("mensajeError");
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
