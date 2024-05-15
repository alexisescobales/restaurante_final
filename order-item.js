// order-item.js
class OrderItem extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'price', 'img'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
          <style>
              .order-item {
                  display: flex;
                  align-items: center;
                  margin-bottom: 10px;
              }
              .order-item img {
                  max-width: 50px;
                  max-height: 50px;
                  margin-right: 10px;
              }
              .order-item button {
                  margin: 0 5px;
              }
          </style>
          <div class="order-item">
              <img id="img" src="" alt="">
              <span id="name"></span>
              <span> - </span>
              <span id="price">0.00</span>€
              <button class="remove">-</button>
              <span class="quantity">1</span>
              <button class="add">+</button>
          </div>
      `;

      //Cantidad siempre sumara de 1 en 1
        this.quantity = 1;

        //Precio inicializado
        this.price = 0;

        //Funcion de sumar
        this.shadowRoot.querySelector('.add').addEventListener('click', () => this.updateQuantity(1));
        
        //Funcion de restar
        this.shadowRoot.querySelector('.remove').addEventListener('click', () => this.updateQuantity(-1));
    }

    //Añade el nombre, precio y img a el div de la cuenta
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name') {
            this.shadowRoot.getElementById('name').textContent = newValue;
        } else if (name === 'price') {
            this.price = parseFloat(newValue);
            this.shadowRoot.getElementById('price').textContent = this.price.toFixed(2);
        } else if (name === 'img') {
            this.shadowRoot.getElementById('img').src = newValue;
            this.shadowRoot.getElementById('img').alt = newValue;
        }
    }

    updateQuantity(amount) {
        this.quantity += amount;
        // Resta el precio del plato del precio total cuando la cantidad llega a cero y luego elimina el plato
        if (this.quantity === 0) {
            this.dispatchEvent(new CustomEvent('update-total', {
                detail: { amount: -this.price },
                bubbles: true,
                composed: true
            }));
            this.remove();
        } else {
            // Actualiza la cantidad del plato y dispara un evento para actualizar el precio total
            this.shadowRoot.querySelector('.quantity').textContent = this.quantity;
            this.dispatchEvent(new CustomEvent('update-total', {
                detail: { amount: this.price * amount },
                bubbles: true,
                composed: true
            }));
        }
    }
    
}

customElements.define('order-item', OrderItem);
