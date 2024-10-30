'use strict';

import generate from "./generate.js";
import settings, { elements } from "./settings.js";
let lockBoard = false;
let firstCard, secondCard;

// let score = generate.score;

const game = {
    flipCard() {
        if (lockBoard) return;

        if (this === firstCard) return;
        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;
        game.checkForMatch();
    },

    checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }
}

const disableCards = () => {

    settings.score += 1;
    generate.setScore(settings.score);
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

const unflipCards = () => {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

export const flipCard = game.flipCard;