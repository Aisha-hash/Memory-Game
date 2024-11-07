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
let clicks = 0;
const game = {
    flipCard() {
        if (lockBoard) return;

        if (this === firstCard) return;
        this.classList.add('flipped');
        settings.numOfClicks += 1;
        generate.setNumOfClicks(settings.numOfClicks);

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
            firstCard.style.opacity = '0';
            firstCard.style.transition = 'opacity 1s ease';
            secondCard.style.opacity = '0';
            secondCard.style.transition = 'opacity 1s ease';
        }, 1000);

        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        if ((settings.cardsLength / 2 == settings.flipped) && settings.level < 6) setTimeout(checkIfDone, 2000);
        game.resetBoard();
    },

    unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            game.resetBoard();
        }, 1000);
    },

    resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    },

    handleChange(evt) {
        //if event is triggered by user, reset score
        if (evt.isTrusted) {
            settings.score = 0;
            settings.elapsedTime = 0;
            settings.flipped = 0;
            settings.numOfClicks = 0;
            settings.minutes = 0;
            settings.seconds = 0;
            elapsedMinutes = 0;
            elapsedSeconds = 0;
            clicks = 0;
            game.resetBoard();
        }
        const selectedValue = evt.target.value;
        if (elements.displayElement) elements.displayElement.style.display = 'none';
        elements.gameContainer.innerHTML = '';
        elements.gameContainer.style.display = 'grid';
        elements.resetButton.style.display = 'block';
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
    },

    restart() {
        game.resetBoard();
        settings.score = 0;
        settings.elapsedTime = 0;
        settings.flipped = 0;
        settings.numOfClicks = 0;
        settings.level = 1;
        if (elements.displayElement)
            elements.displayElement.style.display = 'none';
        elements.gameContainer.style.display = 'grid';
        elements.selector.value = String(settings.level);
        const event = new Event('change');
        elements.selector.dispatchEvent(event);
    }
}

const checkIfDone = () => {
    settings.flipped = 0;

    elements.displayElement = dom.create(false, 'div', false, 'display');

    elapsedMinutes = settings.minutes - elapsedMinutes;
    elapsedSeconds = settings.seconds - elapsedSeconds;
    clicks = settings.numOfClicks - clicks;
    elements.displayElement.innerHTML = `
        <p>Level Cleared!!!</p>
        <div class="results">
            <p class="score">Score: ${settings.score}</p>
            <p class="score">Highscore: ${settings.previousScore}</p>
            <p>Time: ${String(elapsedMinutes).padStart(2, '0')}:${String(elapsedSeconds).padStart(2, '0')}</p>
            <p>Moves: ${clicks}</p>
            </div>`;
    elements.gameContainer.before(elements.displayElement);
    elements.gameContainer.style.display = 'none';
    elements.resetButton.style.display = 'none';
    clearInterval(settings.timerCounter);
    elements.displayElement.classList.add('rotate');

    if (settings.level < 5) {
        let nextLevel = dom.create(false, 'div', elements.displayElement, 'nextLevel');
        nextLevel.innerHTML = `
            <p>Move to next Level?</p>
            <button class="btn yes">Yes</button>
            <button class="btn no">Cancel</button>`
        elements.displayElement.append(nextLevel);
        elements.confirmButton = elements.displayElement.querySelector('.yes');
        elements.cancelButton = elements.displayElement.querySelector('.no');
        elements.confirmButton.addEventListener('click', moveToNextLevel);
        elements.cancelButton.addEventListener('click', game.restart);
    } else {
        elements.resetButton.style.display = 'block';
        function startShaking() {
            elements.resetButton.classList.add('pulse');
        }
        let pulseInterval = setInterval(startShaking, 1000);

        elements.resetButton.addEventListener('click', () => {
            elements.resetButton.classList.remove('pulse');
            clearInterval(pulseInterval);
        });
    }
}

const moveToNextLevel = () => {
    settings.level += 1;
    elements.selector.value = String(settings.level);
    const event = new Event('change');
    elements.selector.dispatchEvent(event);
    elements.gameContainer.style.display = 'grid';
    elements.resetButton.style.display = 'block';
    elements.displayElement.remove();
}

export const flipCard = game.flipCard;
export const handleChange = game.handleChange;
export const onLoad = game.onLoad;
export const restart = game.restart;