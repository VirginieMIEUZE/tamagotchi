function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

function generateRandomSpace() {
    return new Array(between(0,50)).fill(' ').join('')
}

module.exports = {
    between: between,
    generateRandomSpace: generateRandomSpace
}