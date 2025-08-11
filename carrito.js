let carrito = [];
let nombreProducto;
let precioProducto;

let usuario = prompt('Ingresar nombre de usuario')
console.log({usuario})

const crearProducto = (nombreProducto, precioProducto) => {
    return {
        nombre: nombreProducto,
        precio: precioProducto
    }
}

function validarIngresoConfirm(confirmar) {
    return confirmar != 's' && confirmar != 'n';
}

while(usuario == null || usuario == '' ){
    alert('El nombre de usuario es requerido');
    usuario = prompt('Ingresar nombre de usuario')
}

let confirmar = prompt('Bienvenido/a ' + usuario + ' desea agregar algún producto? s/n')
console.log({ confirmar, fun: validarIngresoConfirm(confirm) })
while (validarIngresoConfirm(confirmar)){
    console.log({ confirmar, fun: validarIngresoConfirm(confirm) })
    confirmar = prompt('solo puede escribir s para si o n para no')
}

let confirmValido = confirmar == 's';

while (confirmValido) {
    nombreProducto = prompt('agregar Nombre del Producto')

    while(nombreProducto == null || nombreProducto == ''){
        alert('El nombre del producto es requerido');
            nombreProducto = prompt('agregar Nombre del Producto')
    }


    precioProducto = parseFloat(prompt('agregar Precio del Producto'))

    while(precioProducto == null || precioProducto == '' || isNaN(precioProducto)){
        alert('El precio es requerido y numerico');
        precioProducto = prompt('agregar Precio del Producto')
    }

    const producto = crearProducto(nombreProducto, precioProducto)
    carrito.push(producto)
    confirmar = prompt('agregar mas producto? s/n')
    while (validarIngresoConfirm(confirmar)){
        confirmar = prompt('solo puede escribir s para si o n para no')
    }
    
    confirmValido = confirmar == 's';
}   


console.log({ carrito })