'use strict';

import settings, { elements } from "./settings.js";
import ajax from "./ajax.js";

const level = {
    levelOne() {
        settings.level = 1;
        settings.numOfCards = 2;
        settings.cardsWidth = '9em';
        elements.gameContainer.style.gridTemplateColumns = `repeat(2,${settings.cardsWidth})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(2, calc(${settings.cardsWidth}/2 *3))`;
        ajax.loadData();
    },
    levelTwo() {
        settings.level = 2;
        settings.numOfCards = 4;
        settings.cardsWidth = '9em';
        elements.gameContainer.style.gridTemplateColumns = `repeat(4,${settings.cardsWidth})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(2, calc(${settings.cardsWidth}/2 *3))`;
        ajax.loadData();
    },
    levelThree() {
        settings.level = 3;
        settings.numOfCards = 6;
        elements.gameContainer.innerHTML = '';
        settings.cardsWidth = '7.8em';
        elements.gameContainer.style.gridTemplateColumns = `repeat(4,${settings.cardsWidth})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(3, calc(${settings.cardsWidth}/2 *3))`;
        ajax.loadData();
    },
    levelFour() {
        settings.level = 4;
        settings.numOfCards = 9;
        settings.cardsWidth = '7.5em';
        elements.gameContainer.style.gridTemplateColumns = `repeat(6,${settings.cardsWidth})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(3, calc(${settings.cardsWidth}/2 *3))`;
        ajax.loadData();
    },
    levelFive() {
        settings.level = 5;
        settings.numOfCards = 12;
        settings.cardsWidth = '6em';
        elements.gameContainer.style.gridTemplateColumns = `repeat(6,${settings.cardsWidth})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(4, calc(${settings.cardsWidth}/2 *3))`;
        ajax.loadData();
    }
}

export default level;