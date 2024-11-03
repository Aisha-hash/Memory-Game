'use strict';

import generate from "./generate.js";
import settings, { elements } from "./settings.js";
import level from "./levels.js";
import dom from "./dom.js";
import welcome from './welcome.js';


let lockBoard = false;
let firstCard, secondCard;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
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
        welcome.welcomeScreen();
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
    /*  const userConfirm = confirm('move to next level?');
     if (userConfirm) {
         //move to other level
         
     } */
    elements.displayElement = dom.create(false, 'div', false, 'display');

    elapsedMinutes = settings.minutes - elapsedMinutes;
    elapsedSeconds = settings.seconds - elapsedSeconds;

    elements.displayElement.innerHTML = `
        <p>Level Cleared!!!</p>
        <div class="results">
            <p class="score">Score: ${settings.score}</p>
            <p class="score">Highscore: ${settings.previousScore}</p>
            <p>Time: ${String(elapsedMinutes).padStart(2, '0')}:${String(elapsedSeconds).padStart(2, '0')}</p>
            <p>No. of Clicks:</p>
            </div>
            <div class="nextLevel">
            <p>Move to next Level?</p>
            <button class="btn yes">Yes</button>
            <button class="btn no">Cancel</button></div>
         `;
    elements.gameContainer.before(elements.displayElement);
    elements.gameContainer.style.display = 'none';
    elements.resetButton.style.display = 'none';
    clearInterval(settings.timerCounter);
    elements.confirmButton = elements.displayElement.querySelector('.yes');
    elements.cancelButton = elements.displayElement.querySelector('.no');
    elements.confirmButton.addEventListener('click', moveToNextLevel);
    elements.cancelButton.addEventListener('click', () => console.log('yes'));
}

const moveToNextLevel = (displayElement) => {
    console.log('next level');
    settings.level += 1;
    elements.selector.value = String(settings.level);
    const event = new Event('change');
    elements.selector.dispatchEvent(event);
    elements.gameContainer.style.display = 'grid';
    elements.displayElement.remove();
}


export const flipCard = game.flipCard;
export const handleChange = game.handleChange;
export const onLoad = game.onLoad;