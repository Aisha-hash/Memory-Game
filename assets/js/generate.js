'use strict';
import dom from "./dom.js";
import settings, { elements } from "./settings.js";
import { flipCard } from "./game.js";

const generate = {
    //Fisher-Yates shuffle algorithm
    shuffleCards() {
        let cards = settings.cards;
        let randomIndex, temp;
        let currentIndex = cards.length;
        while (--currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            temp = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temp;
        }
    },

    generateCards() {
        let cards = settings.cards;

        //set data
        generate.setScore(settings.score);

        generate.setNumOfClicks(settings.numOfClicks);

        //start timer
        settings.timerCounter = setInterval(() => {
            settings.elapsedTime += 1;
            generate.updateTimer();
        }, 1000);

        cards.forEach((card, index) => {
            const cardElement = dom.create(false, 'div', false, 'card');
            cardElement.setAttribute('data-name', card.name);//set custom attribute data-name, so it could be accessed easily as dataset.name
            cardElement.innerHTML = '';
            cardElement.innerHTML = `<div class="cardInner">
                      <div class="front">
                       <img class="front-image" src=${card.image} alt=${card.name} />
                       </div>
                       <div class="back"></div></div>`;

            //set height and width of each card
            cardElement.style.width = settings.cardsWidth;
            cardElement.style.height = `calc(${settings.cardsWidth}/2 *3)`;
            elements.gameContainer.appendChild(cardElement);

            setTimeout(() => {
                cardElement.classList.add('visible')
            }, index * 30);

            cardElement.addEventListener('click', flipCard);
        })
    },

    //set score function
    setScore(score) {
        elements.scoreText.innerText = score;
        settings.previousScore = Math.max(score, settings.previousScore);
        localStorage.setItem('score', JSON.stringify(settings.previousScore));
    },

    //set number of clicks function
    setNumOfClicks(clicks) {
        elements.numOfClicks.innerText = clicks;
    },

    //timer function
    updateTimer() {
        settings.minutes = Math.floor((settings.elapsedTime % 3600) / 60);
        settings.seconds = settings.elapsedTime % 60;

        // Format the time to always show two digits
        elements.timer.textContent = `${String(settings.minutes).padStart(2, '0')}:${String(settings.seconds).padStart(2, '0')}`
    },
}

export default generate;