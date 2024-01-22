// circular progress drawing
gsap.fromTo('.progress-wrap path', {
    drawSVG: 0
}, {
    drawSVG: "100%",
    scrollTrigger: {
        start: 0,
        end: "max",
        scrub: true
    }
});

// show/hide
gsap.fromTo(".progress-wrap", {
    yPercent: 100,
    autoAlpha: 0
}, {
    yPercent: 0,
    autoAlpha: 1,
    scrollTrigger: {
        start: 5,
        toggleActions: "play none none reverse"
    }
})

// on click, scroll back to top
document.querySelector('.header').addEventListener("click", (e) => {
    gsap.to(window, {
        scrollTo: 0,
        duration: 0.55
    })
});



{/* 
████████╗██████╗  █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗ 
╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝ 
██║   ██████╔╝███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
██║   ██║  ██║██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝   */}






const svgVBox = { x: 1863, y: 9797 }

const ITERATIONS = 2500

function mapPath(id) {
const el = document.getElementById(id)
const totalLength = el.getTotalLength()

let coordinates = []

const step = totalLength / (ITERATIONS * 2)

for (let index = 0; index < totalLength; index += step) {
    const { x, y } = el.getPointAtLength(index);
    coordinates.push({ x, y })
}


if (coordinates[0].y > coordinates[coordinates.length - 1].y) {
    coordinates.reverse()
}

let maxY = coordinates[coordinates.length - 1].y

return {
    coordinates,
    maxY,
    minY: coordinates[0].y
}

}


let keyframes = {};


function getKeyframes(coords) {
// 
console.warn('Calcolo le coordinate, non dovrebbero essere nel json?')
const { coordinates, maxY, minY } = coords

const keyframes = { x: [], y: [] }

for (let index = 0; index < ITERATIONS; index++) {

    const progress = index / ITERATIONS

    let coor = coordinates.find((c) => c.y >= minY + (maxY - minY) * progress)

    keyframes.x.push((100 * coor.x / svgVBox.x).toFixed(4) + "%")
    keyframes.y.push((100 * coor.y / svgVBox.y).toFixed(4) + "%")
}

return keyframes
}


function animateOnScroll(badgeId, pathId) {
const coordinates = pathId in keyframes ? keyframes[pathId] : getKeyframes(mapPath(pathId))

// OPERATORE TERNARIO: SE KEYFRAMES HA PATHID --> SI PRENDE KEYFRAMES PATHID, ALTRIMENTI SI PRENDE LE KEYFRAMES DI GETKEYFRAMES

// salvo le cordinate in keyframes
keyframes[pathId] = coordinates

gsap.to('#' + badgeId, {
    keyframes: {
        left: coordinates.x,
        top: coordinates.y,
    },
    scrollTrigger: {
        trigger: '#' + pathId,
        start: 'top 50%',
        end: 'bottom 50%',
        // markers: true,
        scrub: .1,


    },


})
}

{/* PRENDE IL FILE KEYFRAME.JSON in cui c'è l'array, poi viene fatta una promessa, che quando viene risolta, viene fatto il console.log di data, che è il json */}

{/* lui fa il fetch; elabora il risultato; poi fa la funzione dopo su animateonscroll --> quando sono disponibili tutti i dati si richiama animateonscroll */}
{/* console.time inizia il timer, console.timeEnd lo ferma */}

console.time('fetch')
fetch('keyframes.json')
.then((response) => response.json())
.then((data) => {
    // il contenuto del json viene assegnato a keyframes

    keyframes = data

    animateOnScroll('bianco-label', 'tentacolobianco')
    animateOnScroll('holly-label', 'true-holly')
    animateOnScroll('ezra-label', 'true-ezra')
    animateOnScroll('connie-label', 'true-connie')
    animateOnScroll('george-label', 'true-george')
    animateOnScroll('den-label', 'true-den')
    animateOnScroll('emily-label', 'true-emily')
    animateOnScroll('ben-label', 'true-ben')

    console.timeEnd('fetch')


    // console.log(JSON.stringify(keyframes))

})




function schiarisciBadge(groupId, label) {


ScrollTrigger
    .create({
        trigger: groupId,
        start: 'top 50%',
        end: 'bottom 50%',
        // markers: true,
        scrub: .1,
        onToggle: () => {
            document
                .getElementById(label)
                .classList
                .toggle('active')
        },

    })
}

schiarisciBadge('#Ezra1', "ezra-label")
schiarisciBadge('#Ezra2', "ezra-label")
schiarisciBadge('#Ezra3', "ezra-label")
schiarisciBadge('#Connie1', "connie-label")
schiarisciBadge('#Den1', 'den-label')
schiarisciBadge('#Den2', 'den-label')
schiarisciBadge('#Ben1', 'ben-label')
schiarisciBadge('#Emily1', 'emily-label')
schiarisciBadge('#Emily2', 'emily-label')
schiarisciBadge('#Emily3', 'emily-label')
schiarisciBadge('#Emily4', 'emily-label')
schiarisciBadge('#Emily5', 'emily-label')
schiarisciBadge('#Emily6', 'emily-label')



function schiarisciBadgeFinale(groupId, label) {


ScrollTrigger.create({
    trigger: groupId,
    start: 'top 50%',
    end: 'bottom 50%',
    scrub: .1,
    onEnter: () => {
        document.getElementById(label)
            .classList.add('active')
    },
    onLeaveBack: () => {
        document.getElementById(label)
            .classList.remove('active')
    },

})
}

schiarisciBadgeFinale('#Ezra4', 'ezra-label')
schiarisciBadgeFinale('#Holly1', 'holly-label')
schiarisciBadgeFinale('#George1', 'george-label')
schiarisciBadgeFinale('#Connie2', 'connie-label')
schiarisciBadgeFinale('#Den3', 'den-label')
schiarisciBadgeFinale('#Ben2', 'ben-label')
schiarisciBadgeFinale('#Emily7', 'emily-label')


function timeline(timeId) {

gsap.to(timeId, {

    scrollTrigger: {
        trigger: timeId,
        start: 'top 70%',
        // 50% dal bottom
        end: 'top 0%',
        // 0% dal bottom

        // markers: true,
        toggleActions: "play reverse play reverse"
    },
    opacity: 1,
}
)

}

for (let i = 1; i <= 35; i++) {
let paddedNumber = String(i).padStart(2, '0');
timeline('#time' + paddedNumber);
}





function popup(popupId) {

gsap.to(popupId, {

    scrollTrigger: {
        trigger: popupId,
        start: 'top 50%',
        // 50% dal bottom
        // end: 'top 0%',
        // 0% dal bottom

        // markers: true,
        toggleActions: "play reverse play reverse"
    },
    opacity: 1,
}
)

}
popup('#popup1')
popup('#popup2')
popup('#popup3')
popup('#popup4')
popup('#popup5')
popup('#popup6')
popup('#aboutit')
popup('#plot')
popup('#story')

// popup('#medusa')
// popup('#medusa-wrapper')



function footer(footerId) {

gsap.to(footerId, {

    scrollTrigger: {
        trigger: footerId,
        start: 'top 95%',
        end: 'bottom 5%',
        // 50% dal bottom
        // end: 'top 0%',
        // 0% dal bottom

        markers: true,
        toggleActions: "play reverse play reverse"
    },
    opacity: 1,
}
)

}
footer('.creators')






function tentacoli(tentacoliId) {

gsap.to(tentacoliId, {

    scrollTrigger: {
        trigger: tentacoliId,
        start: 'top 95%',
        end: 'bottom 5%',
        // 50% dal bottom
        // end: 'top 0%',
        // 0% dal bottom

        // markers: true,
        toggleActions: "play reverse play reverse"
    },
    opacity: 1,
}
)

}
tentacoli('#HOLLY')
tentacoli('#GEORGE')
tentacoli('#CONNIE')
tentacoli('#EZRA')
tentacoli('#DEN')
tentacoli('#BEN')
tentacoli('#EMILY')
tentacoli('#TIM')







// function cursor(cursorId) {
//     // Definisci l'SVG del cursore
//     let cursorSVG = "url('assets/medusinared.svg'), auto";

//     gsap.to(cursorId, {
//         scrollTrigger: {
//             trigger: cursorId,
//             start: 'top 70%',
//             end: 'top 0%',
//             markers: true,
//             toggleActions: "play reverse play reverse",
//             onEnter: () => document.body.style.cursor = cursorSVG, // Cambia il cursore quando l'elemento entra nel viewport
//             onLeaveBack: () => document.body.style.cursor = 'default', // Ripristina il cursore quando l'elemento esce dal viewport
//         },
//         opacity: 1,
//     });
// }

// cursor('#Ben1');
// cursor('#Ben2');






// toggleActions: 'play none none reverse',
// onEnter onLeave onEnterBack onLeaveBack







