let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
})

tl.add({
    targets: 'section div',
    width: '100%',
    backgroundColor: 'rgb(197, 197, 255)',
    delay: anime.stagger(100)
})

tl.add({
    targets: 'section div',
    width: '90%',
    backgroundColor: 'rgb(235, 197, 255)',
})

tl.add({
    targets: 'h1',
    top: '20%',
    ocupacity: 1,
    duration: 4000
})

tl.add({
    targets: 'button',
    top: '5%',
    ocupacity: 1,
    width: '15%',
})


let rotateMe = anime({
    targets: 'section',
    scaleY: '2',
    scaleX: '2',
    translateX: '40%',
    rotate: '45deg',
    duration: 5000,
    autoplay: false
})

document.querySelector('h1').addEventListener('mouseover', () => {
    rotateMe.play();
})
