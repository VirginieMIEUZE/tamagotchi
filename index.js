const readline = require('readline')
const logUpdate = require('log-update')
const chalk = require('chalk')
const { between, generateRandomSpace } = require('./utilities')
const { stat } = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }

process.stdin.on('keypress', (character, key) => { 
    switch(character) {
        case 'f':
            giveSomeFood()
            break;

        case 'c':
            wash()
            break;

        case 'h':
            heal()
            break;

        case 'p':
            play()
            break;
    }
})

rl.on('close', () => {
    process.exit(0)
})

// Objet d'état

const state = {
    health: 10,
    food: 10,
    cleanliness: true,
    mood: 'normal',
    time: 0 // Temps en seconde
}

//Affichage de Piggy

function getPig() {
    if (state.health > 0) {
        let pig = [
            '(•(00)•)',
            '(·(00)·)',
          ];

        if (state.mood === 'happy') {
            pig = ['(^(00)^)']
        }


        if (state.cleanliness == false) {
            state.mood = 'sad'
            pig = ['(o(00)o)']

            if (state.food <= 0) {
                state.mood = 'crying'
                pig = ['(T(00)T)']
            }
            return generateRandomSpace() + chalk.magentaBright(pig[Math.floor(Math.random() * pig.length)]) + generateRandomSpace() + '💩'
        }
        if (state.food <= 0) {
            pig = ['(>(00)<)']
            state.mood = 'sad'

            if (state.cleanliness == false) {
                state.mood = 'crying'
                pig = ['(T(00)T)']
            }
        }
        return generateRandomSpace() + chalk.magentaBright(pig[Math.floor(Math.random() * pig.length)])
    } else {
        return '⎧ᴿᴵᴾ⎫ Rest in Peace Piggy !'
    }
}

//Barre de vie

function getHealthBar() {
    if (state.health > 0) {
        const heartFull = '💚'
        const heartEmpty = '💔'

        const total = 10
        const full  = (state.health * total) / 10
        const empty = total - full

        return 'Health : ' + new Array(Math.floor(full)).fill(heartFull).join(' ') + ' '
        + new Array(Math.floor(empty)).fill(heartEmpty).join(' ')
    }
}

//Barre de faim

function getFoodBar() {
    if (state.health > 0) {
        const foodFull = '🍏'
        const foodEmpty = '🍎'

        const total = 10
        const full  = (state.food * total) / 10
        const empty = total - full

        if (state.food <= 0) {
            return 'PIGGY IS HUNGRY!'
        }

        return 'Hunger : ' + new Array(Math.floor(full)).fill(foodFull).join(' ') + ' '
        + new Array(Math.floor(empty)).fill(foodEmpty).join(' ')
    }
}

//Barre de propreté

function getCleanliness() {
    if (state.health > 0) {
        if (state.cleanliness === false) {
            return 'Piggy is dirty 💩'
        } else {
            return 'Piggy is clean 🚿'
        } 
    }
}

//Barre d'humeur

function getMood() {
    if (state.health > 0) {

        switch(state.mood) {
            case 'happy':
                return mood = 'Mood : 😀'
                
            case 'normal':
                return mood = 'Mood : 🙂'
                
            case 'sad':
                return mood ='Mood : 🙁'
                
            case 'crying':
                return mood = 'Mood : 😭'
                        }
    }
}

//Action

function giveSomeFood() {
    state.health = state.health + 1
    state.food = 10
}

function wash() {
    state.cleanliness = true
    if (state.food > 0) {
        state.mood = 'normal'
    }
}

function heal() {
    state.health = 10
}

function play() {
    state.mood = 'happy'
}


// Affichage par rapport au temps

setInterval(function() {
    const espace = [
        getHealthBar(),
        getFoodBar(),
        getMood(),
        getCleanliness(),
        '',
        getPig(),
        '',
        'Click on "f" for give some food to Piggy',
        'Click on "c" to wash Piggy',
        'Click on "h" to heal Piggy',
        'Click on "p" to play with Piggy',
    ]
    logUpdate(espace.join('\n'))
    state.time += 1

    if (state.food <= 0) {
        if (state.time % 6 === 0) {
            state.health-- 
        }
    }

    if (state.time % 3 === 0) {
        state.food--
        }
    
    if (state.time % 10 === 0) {
        if (state.cleanliness === true) {
        state.cleanliness = Boolean(Math.round(Math.random()));
    }

    }
}, 1000)
