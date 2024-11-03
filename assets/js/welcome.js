'use strict';
import { elements } from "./settings.js";

const welcome = {
    welcomeScreen() {
        elements.welcomeScreen = dom.create(false, 'div', false, 'display');
        elements.welcomeScreen.innerHTML = `
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
        elements.gameContainer.before(elements.welcomeScreen);
        elements.gameContainer.style.display = 'none';
        elements.resetButton.style.display = 'none';
        clearInterval(settings.timerCounter);
        elements.confirmButton = elements.displayElement.querySelector('.yes');
        elements.cancelButton = elements.displayElement.querySelector('.no');
        elements.confirmButton.addEventListener('click', moveToNextLevel);
        elements.cancelButton.addEventListener('click', () => console.log('yes'));

    }
}

export default welcome;