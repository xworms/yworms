function wormGenerator() {
    // var xDirection = (Math.random() > 0.5) ? 1 : -1
    // var yDirection = (Math.random() > 0.5) ? 1 : -1
    var xDirection = Math.random() * 2 - 1
    var yDirection = Math.random() * 2 - 1
    var speed = Math.round(Math.random() * 10)

    var worm = document.createElement("img")
    worm.src = "worm.svg"
    var id = "generatedWorm"+Math.floor(Math.random()*1000)
    worm.setAttribute("id",id)
    worm.setAttribute("class","generatedWorm")
    worm.style.transform = "translate("+Math.random()*window.innerWidth+"px,"+Math.random()*window.innerHeight+"px)"
    document.body.appendChild(worm)
    worm.style.filter = 
        `drop-shadow(2px 2px 3px #000)
        invert(42%)
        sepia(200%)
        saturate(1000%)
        hue-rotate(60deg)
        brightness(${[100,150,200][Math.floor(Math.random()*3)]}%)
        contrast(100%)`

    function updatePosition() {
        var pos = document.getElementById(id).style.transform.split("(")[1].slice(0,-1).split(",")
        var x = parseInt(pos[0])
        var y = parseInt(pos[1])
        checkCollision(x, y)
        x += xDirection*speed
        y += yDirection*speed
        document.getElementById(id).style.transform = "translate("+x+"px,"+y+"px)"
    }

    function checkCollision(x, y) {
        var xMax = window.innerWidth-50
        var yMax = window.innerHeight-35
        if (x >= xMax){
            xDirection = -1
        }
        if (x <= 5){
            xDirection = 1
        }
        if (y >= yMax){
            yDirection = -1
        }
        if (y <= 0){
            yDirection = 1
        }
    }

    async function move(speed) {
        var loopCount = 0
        var loopDuration = Math.random() * 5000
        const loop = setInterval( function() {
            loopCount++
            updatePosition()

            if (loopCount * 160 >= loopDuration) {
                clearInterval(loop)
            }
        }, 80)

        return new Promise(resolve => {
            const intervalCheck = setInterval(() => {
                if (loopCount * 160 >= loopDuration) {
                    clearInterval(intervalCheck)
                    resolve()
                }
            }, 80)
        })

        speed = Math.round(Math.random() * 10)
    }
    async function run() {
        for (let i = 0; i < 20; i++) {
            if (i%2 == 1) { speed = Math.round(Math.random() * 20) }
            else { speed = 0}
            await move(speed)
        }
        worm.remove()
    }
    run()
}

var hue = 0
var hueRotation = 100

function changeColor() {
    hue += hueRotation
    document.documentElement.style.filter = "hue-rotate(" + hue + "deg)"
}

let fontNumber = 0
let font = ['Neue Haas Display Thin','WingDings','Play With Fire']

function changeFont() {
    fontNumber = (fontNumber == font.length-1) ? 0 : fontNumber + 1
    document.body.style.fontFamily = `'${font[fontNumber]}'`
}

function partyMode() {
    document.documentElement.style = "animation-name:zoom;animation-duration:0.2s;animation-iteration-count:infinite;animation-direction:alternate"

    count = 0
    loop = setInterval(() => {
        hueRotation = 10
        console.log(hueRotation)
        count += 1
        changeColor()
        if (count % 10 == 0) {
            wormGenerator()
            changeFont()
        }
        if (count === 100) {
            hue = -1
            changeColor()
            hueRotation = 100
            
            document.documentElement.style = ""

            fontNumber = font.length-1
            changeFont()

            clearInterval(loop)
        }
    },50)
}

function updateTimeAndDate() {
    var d = new Date()
    var h = d.getHours()
    var m = d.getMinutes()
    var s = d.getSeconds()
    var time = ('0'+h).slice(-2)+":"+('0'+m).slice(-2)+":"+('0'+s).slice(-2)

    var year = d.getFullYear()
    var month = d.getMonth()
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var day = d.getDay()
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var date = d.getDate().toString()

    if (date.slice(-1) == '1' && date != '11'){
        dateEnd = 'st'
    }
    else if (date.slice(-1) == '2' && date != '12'){
        dateEnd = 'nd'
    }
    else if (date.slice(-1) == '3' && date != '13'){
        dateEnd = 'rd'
    }
    else{
        dateEnd = 'th'
    }
    document.getElementById("time-and-date").innerHTML =
        time + '.　'
        + days[day] + ' '
        + date + dateEnd + ' '
        + months[month] + ' '
        + year + '.　'
        + getMoonPhase() + '.'
}

function getMoonPhase() {
    const now = new Date()
    const daysSinceNewMoon = (now - new Date("January 6, 2000")) / (1000 * 60 * 60 * 24)
    const phase = (daysSinceNewMoon % 29.53).toFixed(2)

    if (phase < 1.56 || phase >= 28.97) {
        return "<e>🌑</e> New Moon"
    } else if (phase < 5.18) {
        return "<e>🌒</e> Waxing Crescent"
    } else if (phase < 8.81) {
        return "<e>🌓</e> First Quarter"
    } else if (phase < 12.43) {
        return "<e>🐒</e> Waxing Gibbon"
    } else if (phase < 15.95) {
        return "<e>🌕</e> Full Moon"
    } else if (phase < 19.57) {
        return "<e>🌖</e> Waning Gibbous"
    } else if (phase < 23.19) {
        return "<e>🌗</e> Last Quarter"
    } else {
        return "<e>🌘</e> Waning Crescent"
    }
}

function hide(element) {
    document.getElementById(element).style.display = 'none'
}
function show(element) {
    document.getElementById(element).style.display = 'initial'
}

const cursor = document.querySelector('.cursor')

const moveCursor = (e) => {
    const y = e.clientY
    const x = e.clientX

    let wx = window.innerWidth;
    let wy = window.innerHeight;
    let s = window.scrollY;

    let ys = y+s;
    
    cursor1.style.transform = "translate("+x+"px,"+ys+"px)";
    setTimeout(function(){
        let ys = y+s;
        cursor2.style.transform = `translate3d(${x}px, ${ys}px, 0)`
    },20)
    setTimeout(function(){
        let ys = y+s;
        cursor3.style.transform = `translate3d(${x}px, ${ys}px, 0)`
    },150);
    setTimeout(function(){
        let ys = y+s;
        cursor4.style.transform = `translate3d(${x}px, ${ys}px, 0)`
    },250);
    setTimeout(function(){
        let ys = y+s;
        cursor5.style.transform = `translate3d(${x}px, ${ys}px, 0)`
    },350);
}

window.addEventListener('mousemove', moveCursor)

setInterval(function(){updateTimeAndDate()},100)

let resolveIP
const ipReady = new Promise(resolve => resolveIP = resolve)

function getIP(json) {
    resolveIP(json.ip)
}

ipReady.then(ip => {
    headlines[3] = ip
})

const headlines = [
    "Aardvark related incidents are on the rise for unknown reasons.",
    "President Oolun Bongir of Bajookistan passed away at age 205.",
    "Look behind you.",
    null,
    "Garpfeldt Porler Jr becomes first man to successfully frug a ding-worb using only a dungle.",
    "New research suggests that humans could be extinct by 2015.",
    "ooh ee ooh ah ah ting tang walla-walla bing bang.",
    "Cum stock SKYROCKETING after recent load."
]

const innovations = [
    "Worms, Reimagined.",
    "Leading the charge in worm technology.",
    "Innovation. Technology. Worms.",
    "We put the 'U' in Lumbricus terrestris.",
    "Industry leaders in touching our worms.",
    "Would you still love me if I wasn't a worm? 🥺🥺🥺"
]

let headline = 0
function updateText() {
    headline = (headline + 1) % headlines.length
    document.getElementById("marquee-text").textContent = headlines[headline]
}

let innovation = 0
function innovate() {
    innovation = (innovation + 1) % innovations.length
    document.getElementById("innovation").innerHTML = innovations[innovation]
}

setInterval(updateText, 10000)

let linksIndex = 0
function myLinks() {
    show('my-links')
    const linksArray = Array.from(document.getElementById("my-links").children)
    for (link of linksArray) {
        if (linksArray.indexOf(link) == linksIndex) {
            link.style = "visibility: visible"
        } else {
            link.style = "visibility: hidden"
        }
    }
    console.log(linksIndex)
    if (linksIndex == 4) { hide('my-links') }
    linksIndex = (linksIndex + 1) % 5
}
function linksExit() {
    linksIndex = 0
    hide('my-links')
}