'use strict';

import settings from "./settings.js";
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
            let type = settings.dataCards;
            let cards = JSON.parse(xhr.response);
            ajax.processData(cards[type], level);
        } else {
            console.warn(`${xhr.responseURL} konnte nicht geladen werden.Grund: ${xhr.statusText}`);
        }
    },
    processData(payload) {
        //get the num of cards required based on the level.
        let level = settings.numOfCards;
        const numCards = payload.splice(0, level);
        cards = [...numCards, ...numCards];
        settings.cardsLength = cards.length;
        generate.shuffleCards(cards);
        generate.generateCards(cards);
    }
}

export default ajax;