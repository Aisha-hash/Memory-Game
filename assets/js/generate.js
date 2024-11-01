'use strict';
import dom from "./dom.js";
import settings, { elements } from "./settings.js";
import { flipCard } from "./game.js";

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
        //set score
        generate.setScore(settings.score);

        //start timer
        settings.timerCounter = setInterval(() => {
            settings.elapsedTime += 1;
            generate.updateTimer();
        }, 1000);

        //generate cards
        for (let card of cards) {
            const cardElement = dom.create(false, 'div', false, 'card');
            cardElement.setAttribute('data-name', card.name);//set custom attribute data-name, so it could be accessed easily as dataset.name
            cardElement.innerHTML = '';
            cardElement.innerHTML = `
                  <div class="front">
                   <img class="front-image" src=${card.image} alt=${card.name} />
                   </div>
                   <div class="back"></div>`;

            //set height and width of each card
            cardElement.style.width = settings.width;
            cardElement.style.height = `calc(${settings.width}/2 *3)`;
            elements.gameContainer.appendChild(cardElement);
            cardElement.addEventListener('click', flipCard);
        }
    },

    setScore(score) {
        elements.scoreText.innerText = score;
        settings.previousScore = Math.max(score, settings.previousScore);
        localStorage.setItem('score', JSON.stringify(settings.previousScore));
    },

    updateTimer() {
        const minutes = Math.floor((settings.elapsedTime % 3600) / 60);
        const seconds = settings.elapsedTime % 60;

        // Format the time to always show two digits
        elements.timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
}

export default generate;