let productoIds= 0;
const productosStorage = localStorage.getItem('productos');
const productos = JSON.parse(productosStorage) ?? [];
// localStorage.setItem('productos', JSON.stringify(productos));

const sectionListaProductos = document.getElementById("listaProductos");
const nuevoProductoForm = document.getElementById("nuevoProducto");
productoIds = productos.length;

const cliente = { nombre: '', carrito: [] }

function cargarProducto(nombreProducto, precioProducto, stock){
    const errorMensaje = document.getElementById('error-producto');
    errorMensaje.innerHTML = ""; 
    if(nombreProducto == null || nombreProducto == ''){
        errorMensaje.innerHTML = 'El nombre del producto es ibligatorio';
        return;
    }

    precioProducto = parseFloat(precioProducto);
    if(precioProducto == null || precioProducto == '' || isNaN(precioProducto)){
        errorMensaje.innerHTML = 'El precio del producto es obligatorio y numerico';
        return;
    }
    stock = parseInt(stock);
    console.log(stock)
    if(stock == null || stock == '' || isNaN(stock) || stock <= 0){
        errorMensaje.innerHTML = 'El stock del producto es obligatorio y debe ser mayor a 0';
        return;
    }
    
    productoIds += 1;
    productos.push({
        id: productoIds,
        nombre: nombreProducto,
        precio: precioProducto,
        stock: stock,
        disponible: true,
    });
    localStorage.setItem('productos', JSON.stringify(productos));
}

function agregarCarrito(idProducto) {
    const errorMensaje = document.getElementById('error-cliente');
    const errorCarrito = document.getElementById('error-carrito');
    errorMensaje.innerHTML = '';
    errorCarrito.innerHTML = '';

    if(cliente.nombre == '') {
        errorMensaje.innerHTML = 'Debe completar este campo';
        return;
    }

    const producto = productos.find((producto) => producto.id == idProducto);

    if(producto.stock <= 0) {
        errorCarrito.innerHTML = `No hay stock para el producto ${producto.nombre}`
        return;
    }

    const carritoCliente = cliente.carrito.find((producto) => producto.idProducto == idProducto);

    if(carritoCliente != undefined || carritoCliente != null) {
        carritoCliente.cantidad += 1;
        producto.stock -=1;
        mostrarPoductos(sectionListaProductos, productos);
        mostrarPoductosCarrito()
        return;
    }

    producto.stock -=1;

    cliente.carrito.push({
        idProducto,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
    });

    mostrarPoductos(sectionListaProductos, productos);
    mostrarPoductosCarrito()
}

function mostrarPoductos(sectionHTML, listaProductos){
    sectionHTML.innerHTML= ''; // limpiar pantalla
    for (const producto of listaProductos) {
        sectionHTML.innerHTML += `
            <tr>
               <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td><button onclick="agregarCarrito(${producto.id})">Agregar al Carrito</button></td>
            </tr>
        `;
    }
}

const obtenerTotal = (lista) => lista.reduce((valorPrevio, valorActual) => valorPrevio + (valorActual.precio * valorActual.cantidad), 0);

function agregarMasCarrito (idProducto){
    const errorMensaje = document.getElementById('error-carrito-cliente');
    const producto = productos.find((producto)=>producto.id == idProducto);
    errorMensaje.innerHTML = "";
    if(producto.stock <= 0){
        errorMensaje.innerHTML = `No hay stock para el producto ${producto.nombre}`;
        return;
    }

    const carrito = cliente.carrito.find((producto)=> producto.idProducto == idProducto);

    carrito.cantidad += 1;

    producto.stock -= 1;
    
    mostrarPoductos(sectionListaProductos, productos);
    mostrarPoductosCarrito()
}


function mostrarPoductosCarrito(){
    carritoProductosHTML = document.getElementById('carritoProductos');
    carritoTotalHTML = document.getElementById('carritoTotal');

    carritoProductosHTML.innerHTML= ''; // limpiar pantalla del carrito
    carritoTotalHTML.innerHTML = ''; // limpiar pantalla del total del carrito
    
    for (const producto of cliente.carrito) {
        carritoProductosHTML.innerHTML += `
            <tr>
               <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}<button onclick="agregarMasCarrito(${producto.idProducto})">+</button></td>
                <td>${producto.precio * producto.cantidad}</td>
            </tr>
        `;
    }

    carritoTotalHTML.innerHTML = `
            <tr>
               <td>Total: </td>
                <td>${obtenerTotal(cliente.carrito)}</td>
            </tr>
    `

}

function buscarProducto() {
    const value = document.getElementById('buscar').value;
    const productoFilter = productos.filter((producto)=> producto.nombre.includes(value));
    mostrarPoductos(sectionListaProductos, productoFilter)
}





mostrarPoductos(sectionListaProductos, productos)

nuevoProductoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se vuelva a cargar la pagina

  const formData = new FormData(event.target);
 
  cargarProducto(formData.get("nombreProducto"), formData.get('precio'), formData.get('stock'));
  mostrarPoductos(sectionListaProductos, productos)
});

const formNuevoCliente = document.getElementById("nuevoCliente");

formNuevoCliente.addEventListener("submit", function (event) {
    event.preventDefault();

    const errorMensaje = document.getElementById('error-cliente');
    const clienteGuardadoMensaje = document.getElementById('cliente-guardado');

    const formData = new FormData(event.target);

    const nombre = formData.get("clientname");
    const regex = /^[a-zA-Z ]+$/;

    errorMensaje.innerHTML = '';
    clienteGuardadoMensaje.innerHTML = '';
    
    if(nombre == null || nombre == ''){
        errorMensaje.innerHTML = 'El nombre es requerido'
        return;
    }
    
    if(!regex.test(nombre)){
        errorMensaje.innerHTML = 'El nombre debe ser alfabetico'
        return;
    }

    cliente.nombre = nombre;
    clienteGuardadoMensaje.innerHTML = 'Cliente cargado con exito'
})
