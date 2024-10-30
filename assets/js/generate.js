'use strict';
import dom from "./dom.js";
import settings, { elements } from "./settings.js";
import { flipCard } from "./game.js";

let score = 0;
const generate = {
    //Fisher-Yates shuffle algorithm
    shuffleCards(cards) {
        let randomIndex, temp;
        let currentIndex = cards.length;
        while (--currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            temp = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temp;
        }
    },


    generateCards(cards) {
        generate.setScore(settings.score);
        for (let card of cards) {
            const cardElement = dom.create(false, 'div', false, 'card');
            cardElement.setAttribute('data-name', card.name); //set custom attribute data-name, so it could be accessed easily as dataset.name
            cardElement.innerHTML = `
                  <div class="front">
                   <img class="front-image" src=${card.image} alt=${card.name} />
                   </div>
                   <div class="back"></div>`;

            elements.gameContainer.appendChild(cardElement);
            cardElement.addEventListener('click', flipCard)
        }
    },
    setScore(score) {
        elements.scoreText.innerText = score;
    }
}
export default generate;