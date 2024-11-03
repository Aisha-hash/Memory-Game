'use strict';
import dom from './dom.js';
import ajax from './ajax.js';

const init = () => {
    dom.mapping();
    dom.appendEventListeners();
}

document.addEventListener('DOMContentLoaded', init);
