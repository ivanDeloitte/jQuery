/* Polyfills */
import 'whatwg-fetch'
import 'es6-promise/auto';
import '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

/* jQuery Lite */
var doc = document;
var id = e => doc.getElementById(e)

var search = e => search_gifs(id("input_gifs").value);
id("search").addEventListener("click", search);

function search_gifs(param) {
    id("results").innerHTML = "";

    fetch(`https://api.giphy.com/v1/gifs/search?q=${param}&api_key=dc6zaTOxFJmzC`)
        .then(res => res.json()).then(myJson =>
            myJson.data.forEach(elem =>
                id("results").insertAdjacentHTML('beforeend',
                    '<gif-item stop="' + elem.images['480w_still'].url +
                    '" play="' + elem.images.original.url+'"></gif-item>')
            )
        )
}

id("button").addEventListener("click", function() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});

// Declaración de un custom element que hereda de HTMLElement
class GifItem extends HTMLElement {
    constructor() {
        // Siempre debe llamarse primero al constructor padre
        super();
        // Se crea el shadow root
        var shadow = this.attachShadow({
            mode: 'open'
        });
        // Se crea un elemento img y se asignan sus atributos.
        var img = document.createElement('img');
        img.setAttribute('data-play', this.getAttribute('play'));
        img.setAttribute('data-stop', this.getAttribute('stop'));
        img.src = this.getAttribute('stop');
        img.className = 'img-fluid';
        // Añadir la imagen al shadow root.
        shadow.appendChild(img);
        // Añadir dos elementos de escucha a la imagen.
        this.addEventListener('mouseover', function (e) {
            img.src = img.getAttribute('data-play');
        })

        this.addEventListener('mouseout', function (e) {
            img.src = img.getAttribute('data-stop');
        })
    }
}

// Definir el nuevo elemento.
customElements.define('gif-item', GifItem);