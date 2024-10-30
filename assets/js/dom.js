'use strict';

import { elements } from './settings.js';

const dom = {
    $(selector) {
        return document.querySelector(selector);
    },
    $$(selector) {
        return [...document.querySelectorAll(selector)];
    },
    mapping() {

    },
    appendEventListeners() {

    }
}

export default dom;