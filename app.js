const WORDS = [
    'apple', 'mango', 'hello', 'world', 'skill', 'hotel', 'model',
    'japan', 'india', 'nepal', 'dhaka', 'delhi', 'tokyo',
    'brave', 'giant', 'light', 'river', 'plant', 'chair',
    'sharp', 'sweet', 'climb', 'drink', 'flame', 'grape',
    'crown', 'ocean', 'cloud', 'music', 'stone', 'bread',
    'power', 'space', 'metal', 'dream', 'tower', 'glass',
    'beast', 'voice', 'magic', 'angle', 'plain', 'smile',
    'storm', 'flock', 'trace', 'peace', 'mount', 'field'
];

const HINTS = [
    'A fruit often associated with temptation.',
    'A tropical delight, yellow when ripe.',
    'A greeting that spans the globe.',
    'A vast place filled with possibilities.',
    'Something that requires practice to master.',
    'Where you stay on a trip.',
    'A term for a representation or example.',
    'An island nation with a rising sun.',
    'A place with a rich history and spices.',
    'A small country with towering peaks.',
    'A city known for its bustling markets.',
    'A capital with historic significance.',
    'A modern city with neon-lit streets.',
    'Courage personified in one word.',
    'Larger than life in both size and presence.',
    'A natural phenomenon that brightens the dark.',
    'Flows endlessly, shaping landscapes.',
    'It grows from a tiny seed.',
    'A piece of furniture with four legs.',
    'Describes something that can cut.',
    'Often associated with desserts and joy.',
    'To ascend step by step.',
    'A liquid we consume every day.',
    'A flickering source of heat and light.',
    'A small fruit often found in clusters.',
    'Worn by royalty.',
    'A vast, salty expanse.',
    'Fluffy white formations in the sky.',
    'A collection of harmonized sounds.',
    'Hard and cold, found in nature.',
    'A staple food in many cultures.',
    'What drives machines or nations.',
    'An infinite expanse beyond Earth.',
    'A solid material, often shiny.',
    'What you experience while sleeping.',
    'Tall structures that touch the sky.',
    'Clear but fragile.',
    'A wild or mythical creature.',
    'A sound that carries emotion.',
    'An illusion or supernatural force.',
    'A specific measure of direction.',
    'Simple and unadorned.',
    'An expression of happiness.',
    'A violent atmospheric disturbance.',
    'A group of birds or animals.',
    'A faint mark left behind.',
    'A state of tranquility.',
    'To climb or ascend a peak.',
    'A large open area of land.'
];

function pickRandomWordIndex() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return randomIndex;
}

let pickWordIndex = pickRandomWordIndex();
let actualWord = WORDS[pickWordIndex];
let guessCount = 0;
let isWon = false;


const root = document.getElementById('root');

const title = document.createElement('h1');
title.textContent = 'Guess the Word';
title.className = 'title';
root.appendChild(title);

const hint = document.createElement('p');
hint.textContent = '"' + HINTS[pickWordIndex] + '"';
hint.className = 'hint';
root.appendChild(hint);

const container = document.createElement('div');
container.className = 'container';
root.appendChild(container);

const info = document.createElement('p');
info.textContent = 'i';
info.className = 'info';

const tooltipList = document.createElement('ul');
tooltipList.className = 'tooltip-list';

tooltipList.innerHTML = `
    <li class="tooltip-item">
        Guess the 5 letter word in 5 tries
    </li>
    <li class="tooltip-item">
        <div>
            <div class="tooltip-icon success"></div>
            <span class="tooltip-text">Green Letter: The letter is present in the word and in the correct position</span>
        </div>
    </li>
    <li class="tooltip-item">
        <div>
            <div class="tooltip-icon danger"></div>
            <span class="tooltip-text">Red Letter: The letter is not present in the word</span>
        </div>
    </li>
    <li class="tooltip-item">
        <div>
            <div class="tooltip-icon worning"></div>
            <span class="tooltip-text">Yellow Letter: The letter is present in the word but in the wrong position</span>
        </div>
    </li>
`;

info.appendChild(tooltipList);
container.appendChild(info);

for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < 5; j++) {
        const p = document.createElement('p');
        p.className = `word w-${i}${j}`;
        row.appendChild(p);
    }
    container.appendChild(row)
}

const form = document.createElement('form');
form.className = 'form';
const input = document.createElement('input');
input.type = 'text';
input.id = 'input';
input.name = 'input';
input.placeholder = 'Enter the Word';
input.autofocus = true;

const submit = document.createElement('button');
submit.type = 'submit';
submit.textContent = 'Submit';
submit.className = 'btn';

const inputContainer = document.createElement('div');
inputContainer.className = 'input-container';
inputContainer.appendChild(input);
inputContainer.appendChild(submit);

const error = document.createElement('p');
error.className = 'error';
form.appendChild(error);
form.appendChild(inputContainer);
root.appendChild(form);

const btnContainer = document.createElement('div');
btnContainer.className = 'btn-container';
const gameOverText = document.createElement('p');
gameOverText.className = 'gameover-text';
const resetBtn = document.createElement('button');
resetBtn.textContent = 'play again';
resetBtn.className = 'btn';
resetBtn.addEventListener('click', reset);
btnContainer.appendChild(gameOverText);
btnContainer.appendChild(resetBtn);
container.appendChild(btnContainer);

function reset() {
    btnContainer.classList.remove('show');
    input.disabled = false;
    guessCount = 0;
    const items = document.querySelectorAll('.word');
    items.forEach(item => {
        item.classList.remove('success');
        item.classList.remove('danger');
        item.classList.remove('worning');
        item.textContent = '';
    });
    gameOverText.classList.remove(isWon ? "text-success" : "text-danger");
    pickWordIndex = isWon ? pickRandomWordIndex() : pickWordIndex;
    actualWord = WORDS[pickWordIndex];
    hint.textContent = '"' + HINTS[pickWordIndex] + '"';
    isWon = false;
}

function gameOver() {
    gameOverText.textContent = isWon ? 'Well done you guessed it' : "Opps! you're out of guess";
    gameOverText.classList.add(isWon ? 'text-success' : "text-danger")
    btnContainer.classList.add('show');
}

function handleSubmit(event) {
    event.preventDefault();

    const currentWord = event.target.input.value.toLowerCase();

    if (currentWord.length !== 5) {
        error.textContent = 'input must be contain 5 letter word';
        return;
    }
    error.textContent = '';

    const matchedWordArr = [];
    for (let i = 0; i < 5; i++) {
        const item = document.querySelector(`.w-${guessCount}${i}`);
        item.textContent = currentWord[i];
        if (currentWord[i] === actualWord[i]) {
            item.classList.add('success');
            matchedWordArr.push(true);
        }
        else if (actualWord.includes(currentWord[i])) {
            item.classList.add('worning');
            matchedWordArr.push(false);
        }
        else {
            item.classList.add('danger');
            matchedWordArr.push(false);
        }
    }
    guessCount++;
    input.value = '';
    if (!matchedWordArr.includes(false)) {
        isWon = true;
        gameOver();
        input.disabled = true;
    }
    if (guessCount > 4) {
        gameOver();
        input.disabled = true;
    }
}

form.addEventListener('submit', handleSubmit);

const footer = document.createElement('footer');
footer.textContent = 'by Hussain';
footer.className = 'footer';
root.appendChild(footer)