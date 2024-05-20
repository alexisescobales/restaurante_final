// Importa el archivo menu-item.js
import './menu-item.js';

// Clase llamada MenuList que extiende HTMLElement
class MenuList extends HTMLElement {

    // Constructor
    constructor() {
        super(); // Llama al constructor de la clase base

        // Adjunta un Shadow DOM al elemento
        this.attachShadow({ mode: 'open' });

        // Define la estructura HTML y los estilos dentro del Shadow DOM
        this.shadowRoot.innerHTML = `
            <!-- Estilos personalizados -->
            <style>
                /* Categorías */
                .category {
                    margin-bottom: 90px;
                    text-align: center;
                }
                /* Encabezados de las categorías */
                .category h2 {
                    margin-bottom: 30px;
                }
                /* Estilos para los elementos dentro de una categoría */
                .items {
                    display: flex;
                    flex-wrap: wrap;
                }
            </style>

            <div class="menu">
  
                <div class="category" id="primers">
                    <h2>PRIMEROS</h2>
                    <div class="items"></div>
                </div>

                <div class="category" id="segons">
                    <h2>SEGUNDOS</h2>
                    <div class="items"></div>
                </div>

                <div class="category" id="postres">
                    <h2>POSTRES</h2>
                    <div class="items"></div>
                </div>
                
                <div class="category" id="begudes">
                    <h2>BEBIDAS</h2>
                    <div class="items"></div>
                </div>
            </div>
        `;
    }

    // Se llama cuando el elemento es insertado en el DOM
    connectedCallback() {
        this.render(); // Renderiza la lista
    }

    // Renderizar la lista de menú
    render() {
        // Array de platos con sus detalles
        const plats = [
            { name: "Ensalada César", price: 8.5, allergens: "Nueces", img: "/img/ensalada.jpg", category: "primers" },
            { name: "Gazpacho Andaluz", price: 7, allergens: "Apio", img: "/img/gazpacho.jpg", category: "primers" },
            { name: "Calamares a la Romana", price: 10, allergens: "Marisco", img: "/img/calamares.jpg", category: "primers" },
            { name: "Tortilla Española", price: 6.5, allergens: "Huevo", img: "/img/tortilla.jpg", category: "primers" },
            { name: "Gambas al Ajillo", price: 12, allergens: "Marisco", img: "/img/gambas.jpg", category: "primers" },

            { name: "Paella Valenciana", price: 18, allergens: "Marisco", img: "/img/paella.jpg", category: "segons" },
            { name: "Lomo a la Parrilla", price: 15, allergens: "Carne", img: "/img/lomo.jpg", category: "segons" },
            { name: "Pescado al Horno", price: 16, allergens: "Pescado", img: "/img/pescado.jpg", category: "segons" },
            { name: "Hamburguesa", price: 10, allergens: "Gluten", img: "/img/hamburguesa.jpg", category: "segons" },
            { name: "Canelones de Carne", price: 12, allergens: "Lactosa", img: "/img/canelones.jpg", category: "segons" },

            { name: "Tiramisú", price: 5.5, allergens: "Gluten", img: "/img/tiramisu.jpg", category: "postres" },
            { name: "Flan Casero", price: 4.5, allergens: "Huevo, Lactosa", img: "/img/flan.jpg", category: "postres" },
            { name: "Mousse de Chocolate", price: 6, allergens: "Lactosa", img: "/img/mousse.jpg", category: "postres" },
            { name: "Frutas del Bosque", price: 6.5, allergens: "Frutos Secos", img: "/img/frutas.jpg", category: "postres" },
            { name: "Helado de Vainilla", price: 3, allergens: "Lactosa", img: "/img/helado.jpg", category: "postres" },

            { name: "Agua Mineral", price: 1.5, allergens: "Ninguno", img: "/img/agua.jpg", category: "begudes" },
            { name: "Cerveza", price: 2, allergens: "Gluten", img: "/img/cerveza.jpg", category: "begudes" },
            { name: "Vino Tinto", price: 3.5, allergens: "Sulfitos", img: "/img/vino.jpg", category: "begudes" },
            { name: "Café", price: 1, allergens: "Ninguno", img: "/img/cafe.jpg", category: "begudes" },
            { name: "Refresco de Limón", price: 2, allergens: "Ninguno", img: "/img/refresco.jpg", category: "begudes" },
        ];

        // Itera sobre cada plato
        plats.forEach(plat => {
            // Crea un elemento de menú para cada plato
            const menuItem = document.createElement('menu-item');
            // Establece los atributos del elemento
            menuItem.setAttribute('name', plat.name);
            menuItem.setAttribute('price', plat.price);
            menuItem.setAttribute('allergens', plat.allergens);
            menuItem.setAttribute('img', plat.img);

            // Agrega el elemento dentro de la categoría correspondiente dentro del Shadow DOM
            this.shadowRoot.querySelector(`#${plat.category} .items`).appendChild(menuItem);
        });
    }
}

// Define 'menu-list' y lo asocia con la clase MenuList
customElements.define('menu-list', MenuList);
