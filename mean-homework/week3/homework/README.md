# Poke Guess
![Landing Page Image](./readme-images/landing-page.png?raw=true "Poke Guess Landing Page")

## Game Description
Poke Guess is a game where winning is based on your ability to guess Pokemon. On 5 correct guesses, you win. On 3 incorrect guesses or timeouts combined, you lose.
## Timer
![Timer Image](./readme-images/timer.png?raw=true "Poke Guess Timer")

Using the Javascript setTimeout method and recursion the timer will countdown from 10 to 0 repeatedly until either the winning or losing condition is met. The timer reaching 0 will count as a strike against the player, causing the timer to reset.
## Pokemon
![Pokemon Image](./readme-images/pokemon.png?raw=true "Poke Guess Pokemonr")

The Pokemon will change on every correct guess, incorrect guess, or the timer reaching 0. There are 20 different Pokemon that can be guessed in this game.
## User Input
![Pokemon Name Input Image](./readme-images/pokemon-name-input.png?raw=true "Poke Guess Name Input")

This where the user will enter their quess regarding the name of the currently displayed Pokemon. The input field will clear after every submission or the timer reaching 0.

## Pokeball Scoring
![Pokeball Scores Image](./readme-images/pokeballs.png?raw=true "Poke Guess Pokeball Scores")

Initially the user has no scores, so all the Pokeballs are greyed out. When a user makes a correct guess the next Pokeball from the left will light up. Once all Pokeballs are lit, an alert will be diplayed indicating that the user won.

## Strikes
![Pokemon Strikes Image](./readme-images/strikes.png?raw=true "Poke Guess Strikes")

The Pokemon above that will signify a strike will appear from the left, one for every time an incorrect guess is made or the timer reaches 0. Once 3 of the above Pokemon have been displayed, an alert will be displayed indicating that the user lost.

##Issues
Audio that triggers for correct guesses or incorrect guesses after a submission will sometimes not fire. The HTML Audio DOM Object was meant for streaming Audio. If I did an implementation of the AudioBuffer interface, I could possibly emulate one shot sounds.

##Requirements
Google Chrome