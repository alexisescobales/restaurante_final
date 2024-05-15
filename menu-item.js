// menu-item.js
class MenuItem extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'price', 'allergens', 'img'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Bootstrap styles */
                @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');

                /* Custom styles */
                .menu-item {
                    margin-bottom: 20px;
                }
                .menu-item img {
                    width: 300px; /* Tamaño personalizado para la imagen */
                    height: 200px; /* Altura automática para mantener la proporción */
                }

                .card {
                    width: 300px; /* Tamaño personalizado para la imagen */
                    height: auto; /* Altura automática para mantener la proporción */
                }
            </style>
            <div class="card menu-item">
                <img id="img" class="card-img-top" src="" alt="">
                <div class="card-body">
                    <h5 class="card-title" id="name"></h5>
                    <p class="card-text">Precio: <span id="price">0.00</span>€</p>
                    <p class="card-text">Alérgenos: <span id="allergens"></span></p>
                    <button class="btn btn-primary">Añadir a la orden</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            const name = this.getAttribute('name');
            const price = this.getAttribute('price');
            const img = this.getAttribute('img');

            this.dispatchEvent(new CustomEvent('add-to-order', {
                detail: { name, price, img },
                bubbles: true,
                composed: true
            }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'name') {
            this.shadowRoot.getElementById('name').textContent = newValue;
        } else if (name === 'price') {
            this.shadowRoot.getElementById('price').textContent = newValue;
        } else if (name === 'allergens') {
            this.shadowRoot.getElementById('allergens').textContent = newValue;
        } else if (name === 'img') {
            const imgElement = this.shadowRoot.getElementById('img');
            imgElement.src = newValue;
            imgElement.alt = newValue;
        }
    }
}

customElements.define('menu-item', MenuItem);
