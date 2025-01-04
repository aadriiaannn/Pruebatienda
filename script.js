let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = calcularTotal();

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
    guardarCarrito();
    alert(`${nombre} ha sido agregado al carrito.`);
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio}`;
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    alert('Gracias por tu compra. Recuerda que la entrega es en persona.');
    carrito = [];
    total = 0;
    actualizarCarrito();
    guardarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + item.precio, 0);
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});
