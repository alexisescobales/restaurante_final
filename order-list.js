// order-list.js
import './order-item.js';

class OrderList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                .order-list {
                    border: 1px solid #000;
                    padding: 10px;
                }
                .total {
                    font-weight: bold;
                    margin-top: 10px;
                }
            </style>
            <div class="order-list">
                <div id="order-items"></div>
                <div class="total">Total: <span id="total-price">0.00</span>€</div>
            </div>
        `;

        this.totalPrice = 0;
    }

    connectedCallback() {
        document.addEventListener('add-to-order', (event) => {
            this.addOrderItem(event.detail);
        });
        this.addEventListener('update-total', (event) => {
            this.updateTotal(event.detail.amount);
        });
    }

    addOrderItem(detail) {
        const orderItems = this.shadowRoot.getElementById('order-items');

        // Comprova si l'element ja està en la comanda
        let existingOrderItem = Array.from(orderItems.children).find(item => item.getAttribute('name') === detail.name);

        if (existingOrderItem) {
            existingOrderItem.updateQuantity(1);
        } else {
            const orderItem = document.createElement('order-item');
            orderItem.setAttribute('name', detail.name);
            orderItem.setAttribute('price', detail.price);
            orderItem.setAttribute('img', detail.img);
            orderItems.appendChild(orderItem);
        }

        this.updateTotal(Number(detail.price));
    }

    updateTotal(amount) {
        this.totalPrice += amount;
        this.shadowRoot.getElementById('total-price').textContent = this.totalPrice.toFixed(2);
    }
}

customElements.define('order-list', OrderList);
