'use strict';

import settings, { elements } from "./settings.js";
import generate from "./generate.js";
let cards = settings.cards;

const ajax = {
    loadData() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'assets/data/data.json');
        xhr.addEventListener('load', ajax.handleLoad);
        xhr.send();
    },
    handleLoad(evt) {
        let xhr = evt.target;
        if (xhr.status == 200) {
            ajax.processData(JSON.parse(xhr.response));
        } else {
            console.warn(`${xhr.responseURL} konnte nicht geladen werden.Grund: ${xhr.statusText}`);
        }
    },
    processData(payload) {
        cards = [...payload, ...payload];
        generate.shuffleCards(cards);
        generate.generateCards(cards);
    }
}

export default ajax;