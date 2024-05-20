// Importa el componente order-item.js
import './order-item.js';

// Clase OrderList que extiende HTMLElement
class OrderList extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement

        // Adjunta un Shadow DOM al elemento
        this.attachShadow({ mode: 'open' });

        // Define la estructura HTML y los estilos
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos para la lista de pedidos */
                .order-list {
                    border: 1px solid #000;
                    padding: 10px;
                }
                /* Estilos para el total */
                .total {
                    font-weight: bold;
                    margin-top: 10px;
                }
            </style>
            <!-- Estructura HTML -->
            <div class="order-list">
                <div id="order-items"></div>
                <div class="total">Total: <span id="total-price">0.00</span>€</div>
            </div>
        `;

        // Inicializa la variable para el precio total
        this.totalPrice = 0;
    }

    // Se llama cuando el elemento es insertado en el DOM
    connectedCallback() {
        // Escucha el evento 'add-to-order' que se dispara cuando se añade un elemento a la orden
        document.addEventListener('add-to-order', (event) => {
            this.addOrderItem(event.detail); // Agrega el elemento de la orden
        });
        // Escucha el evento 'update-total' que se dispara cuando se actualiza el total
        this.addEventListener('update-total', (event) => {
            this.updateTotal(event.detail.amount); // Actualiza el total
        });
    }

    // Agregar un elemento a la orden
    addOrderItem(detail) {
        const orderItems = this.shadowRoot.getElementById('order-items');

        // Comprueba si el elemento ya esta
        let existingOrderItem = Array.from(orderItems.children).find(item => item.getAttribute('name') === detail.name);

        if (existingOrderItem) {
            existingOrderItem.updateQuantity(1); // Si existe, actualiza la cantidad
        } else {
            // Si no existe, crea un nuevo elemento de pedido
            const orderItem = document.createElement('order-item');
            orderItem.setAttribute('name', detail.name);
            orderItem.setAttribute('price', detail.price);
            orderItem.setAttribute('img', detail.img);
            orderItems.appendChild(orderItem); // Agrega el nuevo elemento a la lista de pedidos
        }

        this.updateTotal(Number(detail.price)); // Actualiza el total con el precio del nuevo elemento
    }

    // Actualizar el total de la orden
    updateTotal(amount) {
        this.totalPrice += amount; // Añade o resta la cantidad del nuevo elemento al total
        // Actualiza el texto del total en el DOM
        this.shadowRoot.getElementById('total-price').textContent = this.totalPrice.toFixed(2);
    }
}

// Define 'order-list' y lo asocia con la clase OrderList
customElements.define('order-list', OrderList);
