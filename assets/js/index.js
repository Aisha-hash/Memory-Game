'use strict';
import dom from './dom.js';
import settings, { elements } from './settings.js';
import ajax from './ajax.js';

// let score = 0;

const init = () => {
    dom.mapping();
    ajax.loadData();
    dom.appendEventListeners();
    //display score
    // elements.scoreText.textContent = score;
}

document.addEventListener('DOMContentLoaded', init);
