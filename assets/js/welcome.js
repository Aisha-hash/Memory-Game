'use strict';
import settings, { elements } from "./settings.js";
import ajax from "./ajax.js";

const welcome = {
    welcomeScreen() {
        elements.gameContainer.style.display = 'none';
        elements.resetButton.style.display = 'none';
        elements.data.style.display = 'none';
        elements.foodDeckButton.addEventListener('click', welcome.handleClickFood);
        elements.animalsDeckButton.addEventListener('click', welcome.handleClickAnimals);
    },
    handleClickFood() {
        settings.dataCards = 'food';
        elements.mainScreen.style.display = 'none';
        elements.gameContainer.style.display = 'grid';
        elements.resetButton.style.display = 'block';
        elements.data.style.display = 'flex';
        ajax.loadData();
    },

    handleClickAnimals() {
        settings.dataCards = 'animals';
        elements.mainScreen.style.display = 'none';
        elements.gameContainer.style.display = 'grid';
        elements.resetButton.style.display = 'block';
        elements.data.style.display = 'flex';
        ajax.loadData();
    }
}

export default welcome;