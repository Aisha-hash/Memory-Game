'use strict';

import generate from "./generate.js";
import settings, { elements } from "./settings.js";
import level from "./levels.js";

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
        isMatch ? game.disableCards(firstCard, secondCard) : game.unflipCards();
    },

    disableCards(firstCard, secondCard) {
        settings.flipped += 1;
        settings.score += 1; //update score display
        generate.setScore(settings.score);
        setTimeout(() => {
            firstCard.classList.add('matchedCard');
            secondCard.classList.add('matchedCard');
        }, 1000);
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    },

    unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    },

    handleChange(evt) {
        //if event is triggered by user, reset score
        if (evt.isTrusted) {
            settings.score = 0;
            settings.elapsedTime = 0;

        }
        const selectedValue = evt.target.value;
        clearInterval(settings.timerCounter);
        if (selectedValue === '1') {
            level.levelOne();
            return;
        } else if (selectedValue === '2') {
            level.levelTwo();
            return;
        } else if (selectedValue === '3') {
            level.levelThree();
            return;
        } else if (selectedValue === '4') {
            level.levelFour();
            return;
        } else if (selectedValue === '5') {
            level.levelFive();
            return;
        }
    },

    onLoad() {
        settings.previousScore = JSON.parse(localStorage.getItem('score'));
        settings.previousScore = settings.previousScore ? settings.previousScore : 0;
    }
}


const resetBoard = () => {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    if ((settings.cardsLength / 2 == settings.flipped) && settings.level < 5) setTimeout(checkIfDone, 2000);
}

const checkIfDone = () => {
    settings.flipped = 0;
    const userConfirm = confirm('move to next level?');
    if (userConfirm) {
        //move to other level
        settings.level += 1;
        elements.selector.value = String(settings.level);
        const event = new Event('change');
        elements.selector.dispatchEvent(event);
    }
}


export const flipCard = game.flipCard;
export const handleChange = game.handleChange;
export const onLoad = game.onLoad;