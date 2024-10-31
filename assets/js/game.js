'use strict';

import generate from "./generate.js";
import settings, { elements } from "./settings.js";
import ajax from "./ajax.js";

let lockBoard = false;
let firstCard, secondCard;

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
    },

    handleChange(evt) {
        const selectedValue = evt.target.value;
        if (selectedValue === 'levelOne') {
            settings.level = 2;
            elements.gameContainer.innerHTML = '';
            elements.gameContainer.style.gridTemplateColumns = 'repeat(2,140px)';
            elements.gameContainer.style.gridTemplateRows = 'repeat(2, calc(140px/2 *3))';
            ajax.loadData();
            return;
        } else if (selectedValue === 'levelTwo') {
            settings.level = 4;
            elements.gameContainer.innerHTML = '';
            elements.gameContainer.style.gridTemplateColumns = 'repeat(4,140px)';
            elements.gameContainer.style.gridTemplateRows = 'repeat(2, calc(140px/2 *3))';
            ajax.loadData();
            return;
        } else if (selectedValue === 'levelThree') {
            settings.level = 6;
            elements.gameContainer.innerHTML = '';
            elements.gameContainer.style.gridTemplateColumns = 'repeat(4,140px)';
            elements.gameContainer.style.gridTemplateRows = 'repeat(3, calc(140px/2 *3))';
            ajax.loadData();
            return;
        }

        else if (selectedValue === 'levelFour') {
            settings.level = 9;
            elements.gameContainer.innerHTML = '';
            elements.gameContainer.style.gridTemplateColumns = 'repeat(6,140px)';
            elements.gameContainer.style.gridTemplateRows = 'repeat(3, calc(140px/2 *3))';
            ajax.loadData();
            return;
        }
        else if (selectedValue === 'levelFive') {
            settings.level = 12;
            elements.gameContainer.innerHTML = '';
            elements.gameContainer.style.gridTemplateColumns = 'repeat(6,140px)';
            elements.gameContainer.style.gridTemplateRows = 'repeat(4, calc(140px/2 *3))';
            ajax.loadData();
            return;
        }
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
export default game;