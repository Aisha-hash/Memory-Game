'use strict';

const gameContainer = document.querySelector('.game-container');
let scoreText = document.querySelector('.score');


//display score
scoreText.textContent = score;


const processData = payload => {
    cards = [...payload, ...payload];
    shuffleCards();
    generateCards();
}


const handleLoad = evt => {
    let xhr = evt.target;
    if (xhr.status == 200) {
        processData(JSON.parse(xhr.response));
    } else {
        console.warn(`${xhr.responseURL} konnte nicht geladen werden.Grund: ${xhr.statusText}`);
    }
}


const loadData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'assets/data/data.json');
    xhr.addEventListener('load', handleLoad);
    xhr.send();
}


//Fisher-Yates shuffle algorithm
const shuffleCards = () => {
    let randomIndex, temp;
    let currentIndex = cards.length;
    while (--currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        temp = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temp;
    }
}


const generateCards = () => {
    for (let card of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
    <div class="front">
    <img class="front-image" src=${card.img} alt=${card.name}">
    </div>
    <div class="back"></div>`;
        gameContainer.appendChild(cardElement);
        // cardElement.addEventListener('click', flipCard)
    }
}

const init = () => {
    loadData();
}

document.addEventListener('DOMContentLoaded', init);