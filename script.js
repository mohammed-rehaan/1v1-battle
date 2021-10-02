'use strict';

const totalScoreEl = document.querySelectorAll('.score');
const currentScoreEl = document.querySelectorAll('.current-score');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1 ');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let playing = true;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;



//Functions
const resetAllScores = function () {

    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    activePlayer = 0;
    playing = true;
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    for (let i = 0; i < 2; i++) totalScoreEl[i].textContent = 0;
    for (let i = 0; i < 2; i++) currentScoreEl[i].textContent = 0;

}
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer === 0) ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//starting conditions
resetAllScores();




//Button Functions
newGame.addEventListener('click', resetAllScores);

rollDice.addEventListener('click', function () {
    if (playing) {

        const randomNum = Math.trunc((Math.random() * 6) + 1);
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${randomNum}.png`;

        if (randomNum != 1) {
            currentScore += randomNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});

hold.addEventListener('click', function () {

    if (playing) {

        //Add current score to active players score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if the score of active player is >= 100
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            //switching player
            switchPlayer();
        }
    }

})





