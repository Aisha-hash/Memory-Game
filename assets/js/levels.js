'use strict';

import settings, { elements } from "./settings.js";
import ajax from "./ajax.js";

const level = {
    levelOne() {
        settings.level = 1;
        settings.numOfCards = 2;
        elements.gameContainer.innerHTML = '';
        settings.width = '150px';
        elements.gameContainer.style.gridTemplateColumns = `repeat(2,${settings.width})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(2, calc(${settings.width}/2 *3))`;
        ajax.loadData();
    },
    levelTwo() {
        settings.level = 2;
        settings.numOfCards = 4;
        elements.gameContainer.innerHTML = '';
        settings.width = '140px';
        elements.gameContainer.style.gridTemplateColumns = `repeat(4,${settings.width})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(2, calc(${settings.width}/2 *3))`;
        ajax.loadData();
    },
    levelThree() {
        settings.level = 3;
        settings.numOfCards = 6;
        elements.gameContainer.innerHTML = '';
        settings.width = '140px';
        elements.gameContainer.style.gridTemplateColumns = `repeat(4,${settings.width})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(3, calc(${settings.width}/2 *3))`;
        ajax.loadData();
    },
    levelFour() {
        settings.level = 4;
        settings.numOfCards = 9;
        elements.gameContainer.innerHTML = '';
        settings.width = '120px';
        elements.gameContainer.style.gridTemplateColumns = `repeat(6,${settings.width})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(3, calc(${settings.width}/2 *3))`;
        ajax.loadData();
    },
    levelFive() {
        settings.level = 5;
        settings.numOfCards = 12;
        elements.gameContainer.innerHTML = '';
        settings.width = '110px';
        elements.gameContainer.style.gridTemplateColumns = `repeat(6,${settings.width})`;
        elements.gameContainer.style.gridTemplateRows = `repeat(4, calc(${settings.width}/2 *3))`;
        ajax.loadData();
    }
}

export default level;