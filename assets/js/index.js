'use strict';
import dom from './dom.js';
import { elements } from './settings.js';
import ajax from './ajax.js';

// let score = 0;

const init = () => {
    dom.mapping();
    ajax.loadData();
    //display score
    // elements.scoreText.textContent = score;
}

document.addEventListener('DOMContentLoaded', init);