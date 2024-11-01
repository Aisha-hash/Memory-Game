'use strict';
import { handleChange, onLoad } from './game.js';
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
    },
    appendEventListeners() {
        window.addEventListener('load', onLoad());
        elements.selector.addEventListener('change', handleChange);
    }
}

export default dom;