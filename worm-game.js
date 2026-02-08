var gameTick = 300
var direction = 'down'
var fruitAmount = 10
var score = 0
var wormX = 1
var wormY = 1

let segmentTemp = {
    x: 1,
    y: 1,
    color: "#0E0",
    type: "worm",
    age: 0
}

function makeFruit() {
    return {
        x: random(30),
        y: random(20),
        color: "#E00",
        type: "fruit"
    }
}

let mainArray = [
    segmentTemp,
    makeFruit(),
    makeFruit(),
    makeFruit(),
    makeFruit(),
    makeFruit(),
]

function wormGame() {
    show('worm-game')
    
    const canvas = document.getElementById('worm-game-canvas')
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#DFFCD8'
    ctx.fillRect( 0, 0, canvas.width, canvas.height )
                //x, y, width, height

    setInterval( function(){ gameLoop(ctx) }, gameTick )
}

function gameLoop(ctx) {
    if (direction == 'left') { wormX -= 1 }
    if (direction == 'right') { wormX += 1 }
    if (direction == 'up') { wormY -= 1 }
    if (direction == 'down') { wormY += 1 }

    array = fruitEaten( mainArray )
    array = checkSegments( array )
    generateGrid( ctx, array )
    ageSegments( array )
    console.log( score )
}

function generateGrid( ctx, array ) {
    ctx.fillStyle = '#B2CC48'
    for ( y = 1; y <= 20; y += 1 ) {
        for ( x = 1; x <= 30; x += 1 ) {
            let color = '#B2CC48'
            for ( i = 0; i < array.length; i++ ) {
                cell = array[i]
                if ( x === cell.x && y === cell.y ) {
                    color = cell.color
                    break
                }
            }
            ctx.fillStyle = color
            ctx.fillRect(
                20*(x-1) + 1,
                20*(y-1) + 1,
                19,
                19)
        }
    }
}

function checkSegments( array ) {
    newArray = []
    for ( segment of array ) {
        if ( segment.type == "worm" && segment.age <= score ) {
            newArray.push( segment )
        } else if ( segment.type == "fruit" ) {
            newArray.push( segment )
        }
    }

    newSegment = segmentTemp
    newSegment.x = wormX
    newSegment.y = wormY
    newArray.push( newSegment )

    return newArray
}

function ageSegments( array ) {
    newArray = []
    for ( segment of array ) {
        if ( segment.type == "worm" ) {
            segment.age += 1
        }
        newArray.push( segment )
    }
    return newArray
}

function fruitEaten( array ) {
    newArray = []
    for ( cell of array ) {
        if ( cell.type == "fruit" ) {
            if (cell.x == array[0].x &&
                cell.y == array[0].y) {
                score += 1
                newArray.push( makeFruit() )
                newArray.push( segment )
                console.log(array)
            }
            else { newArray.push(cell) }
        }
        else { newArray.push(cell) }
    }
    return newArray
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') { direction = 'left' }
    if (event.key == 'ArrowRight') { direction = 'right' }
    if (event.key == 'ArrowUp') { direction = 'up' }
    if (event.key == 'ArrowDown') { direction = 'down' }
})

function random(chance) {
    return Math.floor(Math.random() * chance) + 1
}