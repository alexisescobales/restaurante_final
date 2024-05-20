// Clase llamada MenuItem que extiende HTMLElement
class MenuItem extends HTMLElement {
    // Define los atributos
    static get observedAttributes() {
        return ['name', 'price', 'allergens', 'img'];
    }

    // Constructor de la clase
    constructor() {
        super(); // Llama al constructor de la clase HTMLElement

        // Adjunta un Shadow DOM al elemento
        this.attachShadow({ mode: 'open' });

        // Define la estructura HTML y los estilos
        this.shadowRoot.innerHTML = `
        <style>
        /* Estilos Bootstrap */
        @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
    
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
            margin-left: 50px;
            border-radius: 40px; /* Borde redondeado */
        }
    
        .card-title {
            font-weight: bold;
        }
    </style>
    <div class="card menu-item">
        <img id="img" class="card-img-top" src="" alt="">
        <div class="card-body">
            <h5 class="card-title" id="name"></h5>
            <p class="card-text">Precio: <span id="price">0.00</span>€</p>
            <p class="card-text">Alérgenos: <span id="allergens"></span></p>
            <button class="btn btn-primary">Añadir a la cuenta</button>
        </div>
    </div>    
    `;

        // Agrega un event listener al botón
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            // Obtiene los atributos del elemento y los almacena en variables
            const name = this.getAttribute('name');
            const price = this.getAttribute('price');
            const img = this.getAttribute('img');

            // Dispara un evento personalizado 'add-to-order' con la informacion del elemento
            this.dispatchEvent(new CustomEvent('add-to-order', {
                detail: { name, price, img },
                bubbles: true, // Se propague hacia arriba en el DOM
                composed: true // Atraviese los límites de los Shadow DOM
            }));
        });
    }

    // Se llama cuando cambian los atributos
    attributeChangedCallback(name, oldValue, newValue) {
        // Actualiza el contenido dentro del Shadow DOM según el atributo que cambió
        if (name === 'name') {
            this.shadowRoot.getElementById('name').textContent = newValue;
        } else if (name === 'price') {
            this.shadowRoot.getElementById('price').textContent = newValue;
        } else if (name === 'allergens') {
            this.shadowRoot.getElementById('allergens').textContent = newValue;
        } else if (name === 'img') {
            const imgElement = this.shadowRoot.getElementById('img');
            imgElement.src = newValue;
        }
    }
}

// Define 'menu-item' y lo asocia con la clase MenuItem
customElements.define('menu-item', MenuItem);
