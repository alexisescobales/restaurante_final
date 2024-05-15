// menu-list.js
import './menu-item.js';

class MenuList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                .category {
                    margin-bottom: 20px;
                }
                .category h2 {
                    margin-bottom: 10px;
                }
                .items {
                    display: flex;
                    flex-wrap: wrap;
                }
            </style>
            <div class="menu">
                <div class="category" id="primers">
                    <h2>Primers</h2>
                    <div class="items"></div>
                </div>
                <div class="category" id="segons">
                    <h2>Segons</h2>
                    <div class="items"></div>
                </div>
                <div class="category" id="postres">
                    <h2>Postres</h2>
                    <div class="items"></div>
                </div>
                <div class="category" id="begudes">
                    <h2>Begudes</h2>
                    <div class="items"></div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const plats = [
            { name: "Ensalada César", price: 8.5, allergens: "Nueces", img: "ensalada.jpg", category: "primers" },
            { name: "Gazpacho Andaluz", price: 7, allergens: "Apio", img: "gazpacho.jpg", category: "primers" },
            { name: "Calamares a la Romana", price: 10, allergens: "Marisco", img: "calamares.jpg", category: "primers" },
            { name: "Tortilla Española", price: 6.5, allergens: "Huevo", img: "tortilla.jpg", category: "primers" },
            { name: "Gambas al Ajillo", price: 12, allergens: "Marisco", img: "gambas.jpg", category: "primers" },

            { name: "Paella Valenciana", price: 18, allergens: "Marisco", img: "paella.jpg", category: "segons" },
            { name: "Lomo a la Parrilla", price: 15, allergens: "Carne", img: "lomo.jpg", category: "segons" },
            { name: "Pescado al Horno", price: 16, allergens: "Pescado", img: "pescado.jpg", category: "segons" },
            { name: "Hamburguesa", price: 10, allergens: "Gluten", img: "hamburguesa.jpg", category: "segons" },
            { name: "Canelones de Carne", price: 12, allergens: "Lactosa", img: "canelones.jpg", category: "segons" },

            { name: "Tiramisú", price: 5.5, allergens: "Gluten", img: "tiramisu.jpg", category: "postres" },
            { name: "Flan Casero", price: 4.5, allergens: "Huevo, Lactosa", img: "flan.jpg", category: "postres" },
            { name: "Mousse de Chocolate", price: 6, allergens: "Lactosa", img: "mousse.jpg", category: "postres" },
            { name: "Frutas del Bosque", price: 6.5, allergens: "Frutos Secos", img: "frutas.jpg", category: "postres" },
            { name: "Helado de Vainilla", price: 3, allergens: "Lactosa", img: "helado.jpg", category: "postres" },

            { name: "Agua Mineral", price: 1.5, allergens: "Ninguno", img: "agua.jpg", category: "begudes" },
            { name: "Cerveza", price: 2, allergens: "Gluten", img: "cerveza.jpg", category: "begudes" },
            { name: "Vino Tinto", price: 3.5, allergens: "Sulfitos", img: "vino.jpg", category: "begudes" },
            { name: "Café", price: 1, allergens: "Ninguno", img: "cafe.jpg", category: "begudes" },
            { name: "Refresco de Limón", price: 2, allergens: "Ninguno", img: "refresco.jpg", category: "begudes" },
        ];

        plats.forEach(plat => {
            const menuItem = document.createElement('menu-item');
            menuItem.setAttribute('name', plat.name);
            menuItem.setAttribute('price', plat.price);
            menuItem.setAttribute('allergens', plat.allergens);
            menuItem.setAttribute('img', plat.img);

            this.shadowRoot.querySelector(`#${plat.category} .items`).appendChild(menuItem);
        });
    }
}

customElements.define('menu-list', MenuList);
