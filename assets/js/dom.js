'use strict';
import { handleChange, onLoad, restart } from './game.js';
import { elements } from './settings.js';

const dom = {
    create(
        content = false,
        type = 'div',
        parent = false,
        className = false
    ) {
        const el = document.createElement(type);
        if (content) el.innerHTML = content;
        if (className) el.className = className;
        if (parent) parent.append(el);

        return el;
    },
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return [...document.querySelectorAll(selector)];
    },
    mapping() {
        elements.gameContainer = dom.$('.game-container');
        elements.scoreText = dom.$('.score');
        elements.timer = dom.$('.timer');
        elements.selector = dom.$('#level');
        elements.body = dom.$('body');
        elements.results = dom.$('.results');
        elements.resetButton = dom.$('#reset-button');
        elements.data = dom.$('.data');
        elements.welcome = dom.$('.header');
        elements.foodDeckButton = dom.$('.foodDeck');
        elements.animalsDeckButton = dom.$('.animalsDeck');
        elements.mainScreen = dom.$('.mainScreen');
        elements.numOfClicks = dom.$('.clicks')
    },
    appendEventListeners() {
        window.addEventListener('load', onLoad());
        elements.selector.addEventListener('change', handleChange);
        elements.resetButton.addEventListener('click', restart);
    }
}

export default dom;